import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import Grain from '../components/Grain';
import ProgressBar from '../components/ProgressBar';
import Cursor from '../components/Cursor';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ProjectLoader from '../components/ProjectLoader';
import ProjectGallery from './ProjectGallery';
import { useLang } from '../lib/useLang';
import { useChisinauClock } from '../lib/useChisinauClock';
import { useReveal } from '../lib/useReveal';
import { useMagnetic } from '../lib/useMagnetic';
import { getProjectBySlug, getAdjacentProject, PROJECTS } from '../data/projects';
import { projectName, projectTags, projectOverview } from '../i18n';

export default function Project() {
  const { slug } = useParams();
  const [lang, setLang, t] = useLang();
  const clock = useChisinauClock();
  const project = getProjectBySlug(slug);

  useReveal([slug, lang]);
  useMagnetic([slug]);

  if (!project) {
    return (
      <>
        <ProjectLoader key={slug} />
        <Grain />
        <Cursor />
        <SiteHeader lang={lang} setLang={setLang} t={t} activeHref="/portfolio" />
        <main>
          <section className="portfolio-hero">
            <h1>{t.project.notFoundTitle}</h1>
            <p>{t.project.notFoundBody}</p>
            <p style={{ marginTop: 28 }}>
              <Link className="cert magnetic" to="/portfolio">{t.project.notFoundCta}<ArrowUpRight size={13} weight="bold" /></Link>
            </p>
          </section>
        </main>
        <SiteFooter t={t} clock={clock} />
      </>
    );
  }

  const name = projectName(project, lang);
  const tags = projectTags(project, lang);
  const overview = projectOverview(project, lang);
  const platformLabel = t.platformLabels[project.platform];
  const chips = project.chips.map(([d, i]) => t.capabilities.decks[d].items[i]);
  const next = getAdjacentProject(project.slug);
  const nextName = projectName(next, lang);
  const posIndex = PROJECTS.findIndex(p => p.slug === project.slug) + 1;

  return (
    <>
      <ProjectLoader key={project.slug} />
      <Grain />
      <ProgressBar />
      <Cursor />
      <SiteHeader lang={lang} setLang={setLang} t={t} activeHref="/portfolio" />
      <main className="lf-page" key={project.slug}>
        <ProjectGallery
          project={project}
          name={name}
          tags={tags}
          overview={overview}
          platformLabel={platformLabel}
          chips={chips}
          posIndex={posIndex}
          total={PROJECTS.length}
          next={next}
          nextName={nextName}
          t={t}
        />
      </main>
      <SiteFooter t={t} clock={clock} />
    </>
  );
}
