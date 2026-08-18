import { useEffect } from 'react';

/** Makes every `.magnetic` element gently pull toward the cursor on hover. */
export function useMagnetic(deps = []) {
  useEffect(() => {
    const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!(FINE && !RM)) return;
    const magnets = [...document.querySelectorAll('.magnetic')];
    const cleanups = [];
    magnets.forEach(el => {
      const onMove = e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * .25}px,${dy * .35}px)`;
      };
      const onLeave = () => {
        el.style.transform = '';
        el.style.transition = 'transform .5s cubic-bezier(.19,1,.22,1)';
        setTimeout(() => { el.style.transition = ''; }, 500);
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); });
    });
    return () => cleanups.forEach(fn => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
