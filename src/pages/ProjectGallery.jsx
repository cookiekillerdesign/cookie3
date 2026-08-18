import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import GenerativeArt from '../components/GenerativeArt';
import { stripeBg } from '../lib/format';
import { smoothScrollTo } from '../lib/scroll';

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

function mediaKind(file) {
  return VIDEO_EXT.test(file) ? 'video' : 'image'; // gifs render fine as <img>
}

/** Plays a background video only while its frame is actually on screen —
    matters once a case study can carry several autoplaying clips. */
function useAutoplayInView(ref, enabled) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play?.().catch(() => {});
      else el.pause?.();
    }, { threshold: .35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled]);
}

// All frames render at 16:9 — the fixed aspect keeps the vertical rhythm of
// the gallery consistent between plain screenshots and video/gif clips.
function GalleryMedia({ file, name, hue, index, onOpen }) {
  const [broken, setBroken] = useState(false);
  const videoRef = useRef(null);
  const kind = file ? mediaKind(file) : null;
  useAutoplayInView(videoRef, kind === 'video' && !broken);

  return (
    <div className="lf-gitem reveal">
      <button
        type="button"
        className="lf-gframe"
        onClick={() => file && !broken && onOpen(index)}
        aria-label={name || `Slide ${index + 1}`}
      >
        {!file || broken ? (
          <span className="lf-gframe-fallback" style={{ background: stripeBg(hue) }}>
            <GenerativeArt seed={`${hue}${index}`} hue={hue} density={.7} />
          </span>
        ) : kind === 'video' ? (
          <video ref={videoRef} src={file} muted loop playsInline preload="metadata" onError={() => setBroken(true)} />
        ) : (
          <img src={file} alt={name || ''} loading={index < 2 ? 'eager' : 'lazy'} onError={() => setBroken(true)} />
        )}
      </button>
    </div>
  );
}

/** Sticky index/progress HUD — tracks which gallery frame is centred in the
    viewport and the overall scroll position through the gallery. */
function useScrollHud(total, containerRef) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = [...container.querySelectorAll('.lf-gitem')];
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) setActive(items.indexOf(en.target));
      });
    }, { threshold: .5 });
    items.forEach(el => io.observe(el));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); };
  }, [total, containerRef]);
  return [active, progress];
}

function HighlightedTitle({ text }) {
  const words = text.trim().split(/\s+/);
  const last = words.pop();
  return (
    <>
      {words.length > 0 && words.join(' ') + ' '}
      <em>{last}</em>
    </>
  );
}

export default function ProjectGallery({ project, name, tags, overview, platformLabel, chips, posIndex, total, next, nextName, t }) {
  const galleryRef = useRef(null);
  const gallery = project.gallery;
  // only the logo-folio-style case study pairs each frame with its own name —
  // a regular product gallery is screens of one product, not distinct named
  // works, so the roster index only renders when that pairing actually exists
  const namedItems = project.slug === 'logos-for-business' ? t.caseStudy.items : null;
  const [active, progress] = useScrollHud(gallery.length, galleryRef);
  const [lightbox, setLightbox] = useState(null); // index or null

  const jumpTo = (i) => {
    const el = galleryRef.current?.querySelectorAll('.lf-gitem')[i];
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + scrollY - innerHeight * .3;
    smoothScrollTo(targetY, 700);
  };

  const step = (d) => setLightbox(i => (i + d + gallery.length) % gallery.length);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.classList.add('locked');
    const onKey = e => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('locked'); removeEventListener('keydown', onKey); };
  }, [lightbox]);

  const lbFile = lightbox !== null ? gallery[lightbox].file : null;

  return (
    <>
      <section className="lf-intro">
        <div className="lf-eyebrow reveal">
          {t.caseStudy.eyebrowLabel} {String(posIndex).padStart(2, '0')} / {String(total).padStart(2, '0')}
          <span aria-hidden="true">·</span> {tags}
        </div>
        <h1 className="reveal"><HighlightedTitle text={name} /></h1>
        <p className="lf-intro-sub reveal">{overview}</p>
        <div className="lf-meta-row reveal">
          <div className="lf-meta-item"><span>{t.project.client}</span><b>{name}</b></div>
          <div className="lf-meta-item"><span>{t.project.role}</span><b>{tags}</b></div>
          <div className="lf-meta-item"><span>{t.project.year}</span><b>{project.year}</b></div>
          <div className="lf-meta-item"><span>{t.project.platform}</span><b>{platformLabel}</b></div>
        </div>
        {chips.length > 0 && (
          <div className="lf-chips reveal">
            <span className="lf-chips-label">{t.project.skillsLabel}</span>
            {chips.map((c, i) => <span key={i}>{c}</span>)}
          </div>
        )}
      </section>

      <div className="lf-hud" aria-hidden="true">
        <span className="lf-hud-idx">{String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
        <span className="lf-hud-bar"><i style={{ width: `${progress * 100}%` }} /></span>
      </div>

      <div className="lf-gallery" ref={galleryRef}>
        {gallery.map((g, i) => (
          <GalleryMedia key={i} file={g.file} name={namedItems?.[i]?.name} hue={project.hue} index={i} onOpen={setLightbox} />
        ))}
      </div>

      <div className={`lf-lightbox${lightbox !== null ? ' open' : ''}`}>
        <button type="button" className="lf-lb-close" aria-label={t.header.close} onClick={() => setLightbox(null)}><X size={16} weight="bold" /></button>
        <button type="button" className="lf-lb-nav l" aria-label="Previous" onClick={() => step(-1)}><CaretLeft size={16} weight="bold" /></button>
        <button type="button" className="lf-lb-nav r" aria-label="Next" onClick={() => step(1)}><CaretRight size={16} weight="bold" /></button>
        {lbFile && (mediaKind(lbFile) === 'video'
          ? <video src={lbFile} muted loop playsInline autoPlay controls />
          : <img src={lbFile} alt={namedItems?.[lightbox]?.name || ''} />)}
      </div>

      {namedItems && (
        <section className="lf-roster">
          <div className="lf-eyebrow reveal">
            {t.caseStudy.allLabel}
            <span className="lf-roster-hint">{t.caseStudy.clickHint}</span>
          </div>
          <div className="lf-roster-grid">
            {namedItems.map((it, i) => (
              <button type="button" key={i} className={`lf-rrow${active === i ? ' active' : ''}`} onClick={() => jumpTo(i)}>
                <span className="lf-ridx">{String(i + 1).padStart(2, '0')}</span>
                <span className="lf-rname">{it.name}</span>
                <span className="lf-rtag">{it.tag}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <Link className="project-next" to={next.href} data-cursor-label={`↗ ${nextName}`}>
        <span className="pn-label"><span className="pn-swatch" style={{ background: next.hue }} />{t.project.next}</span>
        <span className="pn-name">{nextName}<ArrowRight size={28} weight="bold" /></span>
      </Link>
    </>
  );
}
