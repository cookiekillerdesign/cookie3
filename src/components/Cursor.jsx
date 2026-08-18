import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const [onLink, setOnLink] = useState(false);
  const [label, setLabel] = useState('');
  const [labelShow, setLabelShow] = useState(false);

  useEffect(() => {
    const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!FINE) return;
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, raf;
    const onMove = e => { mx = e.clientX; my = e.clientY; };
    addEventListener('mousemove', onMove);
    const onOver = e => {
      if (e.target.closest('a,button')) setOnLink(true);
      const withLabel = e.target.closest('[data-cursor-label]');
      if (withLabel) { setLabel(withLabel.getAttribute('data-cursor-label')); setLabelShow(true); }
    };
    const onOut = e => {
      if (e.target.closest('a,button')) setOnLink(false);
      if (e.target.closest('[data-cursor-label]')) setLabelShow(false);
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    const loop = () => {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate(${cx}px,${cy}px)`;
      if (labelRef.current) { labelRef.current.style.left = cx + 'px'; labelRef.current.style.top = cy + 'px'; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className={`cursor${onLink ? ' on-link' : ''}`} ref={ref} aria-hidden="true">
        <span className="cursor-ring">
          <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
          <i className="dot" />
        </span>
      </div>
      <div className={`cursor-label${labelShow ? ' show' : ''}`} ref={labelRef} aria-hidden="true">{label}</div>
    </>
  );
}
