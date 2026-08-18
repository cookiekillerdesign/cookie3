import { Link } from 'react-router-dom';
import { ArrowRight, EnvelopeSimple, BehanceLogo, LinkedinLogo, Phone } from '@phosphor-icons/react';
import PixelHeart from './PixelHeart';

export default function SiteFooter({ t, clock }) {
  return (
    <footer id="contact">
      <p className="foot-eyebrow">{t.footer.eyebrow}</p>
      <a className="foot-cta" href="mailto:cookiekiller.design@gmail.com">{t.footer.ctaPre}<span className="swap">{t.footer.ctaSwap}</span><br />{t.footer.ctaPost}</a>

      <div className="foot-ctas">
        <a className="foot-mail" href="mailto:cookiekiller.design@gmail.com"><EnvelopeSimple size={17} weight="bold" />cookiekiller.design@gmail.com<ArrowRight size={15} weight="bold" /></a>
        <Link className="foot-form-trigger" to="/#contact"><span>{t.footer.formTrigger}</span><ArrowRight size={15} weight="bold" /></Link>
      </div>

      <div className="foot-grid">
        <div className="foot-links">
          <a href="https://behance.net/iamcookiekiller" target="_blank" rel="noopener noreferrer"><BehanceLogo size={15} weight="bold" />Behance</a>
          <a href="https://linkedin.com/in/iamcookiekiller" target="_blank" rel="noopener noreferrer"><LinkedinLogo size={15} weight="bold" />LinkedIn</a>
          <a href="tel:+37369555534"><Phone size={15} weight="bold" />+373 69 555 534</a>
        </div>
        <div className="foot-fine"><PixelHeart /> © 2026 Mihail Barascov · <span>{clock}</span> {t.footer.fineSuffix}</div>
      </div>
      <div className="foot-watermark" aria-hidden="true">COOKIEKILLER</div>
    </footer>
  );
}
