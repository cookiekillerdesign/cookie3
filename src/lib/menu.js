export function getSiteMenuLinks(t) {
  return [
    { href: '/#work', num: '01', ...t.nav.work },
    { href: '/portfolio', num: '02', ...t.nav.portfolio },
    { href: '/#about', num: '03', ...t.nav.about },
    { href: '/#capabilities', num: '04', ...t.nav.capabilities },
    { href: '/#experience', num: '05', ...t.nav.experience },
    { href: '/#contact', num: '06', ...t.nav.contact }
  ];
}
