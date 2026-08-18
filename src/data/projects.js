import { PROJECTS_I18N } from '../i18n';

// Each project's case-study gallery. `file` can point to an image, gif, or
// video (mp4/webm/mov) — the page auto-detects the kind from the extension
// and reads the real aspect ratio from the loaded media at runtime, so a
// vertical 9:16 clip and a landscape screenshot can sit in the same list
// with no manual orientation flag needed. Drop real exports at these paths
// under /public and they replace the placeholder automatically; nothing
// breaks while a project still has none.
const logofolioGallery = [
  'Content.png', 'Content-1.png', 'Content-2.png', 'Content-3.png', 'Content-4.png',
  'Content-5.png', 'Content-6.png', 'Content-7.png', 'Content-8.png', 'Content-9.png',
  'Content-10.png', 'Content-11.png', 'Content-12.png'
].map(f => ({ file: `/assets/logofolio/${f}` }));

function placeholderGallery(slug, count = 2) {
  return Array.from({ length: count }, (_, i) => ({ file: `/assets/gallery/${slug}/${String(i + 1).padStart(2, '0')}.jpg` }));
}

export const PROJECTS = [
  { name: 'Victoriabank', slug: 'victoriabank', status: 'case', hue: '#1B3BFF', thumb: '', year: '2025', platform: 'web', category: 'product', chips: [[0, 1], [0, 4], [1, 0]] },
  { name: 'My Doctor 32', slug: 'my-doctor-32', status: 'live', hue: '#00B549', thumb: '', year: '2023', platform: 'web', category: 'product', chips: [[0, 0], [0, 6], [1, 2]] },
  { name: 'Point Money', slug: 'point-money', status: 'case', hue: '#0F0F13', thumb: '', year: '2024', platform: 'ios', category: 'product', chips: [[0, 2], [0, 3], [1, 0]] },
  { name: 'Zazitex.com', slug: 'zazitex', status: 'live', hue: '#1B3BFF', thumb: '', year: '2024', platform: 'web', category: 'product', chips: [[0, 7], [1, 2], [1, 5]] },
  { name: "Conu'Tache", slug: 'conu-tache', status: 'live', hue: '#B4530A', thumb: '', year: '2022', platform: 'web', category: 'ecommerce', chips: [[0, 4], [1, 2], [2, 1]] },
  { name: 'Promez', slug: 'promez', status: 'live', hue: '#0E7490', thumb: '', year: '2021', platform: 'web', category: 'ecommerce', chips: [[0, 4], [0, 0], [1, 2]] },
  { name: 'Des Champs', slug: 'des-champs', status: 'live', hue: '#4D7C0F', thumb: '', year: '2020', platform: 'web', category: 'ecommerce', chips: [[0, 4], [2, 1], [1, 2]] },
  { name: 'YUCA VPN', slug: 'yuca-vpn', status: 'live', hue: '#6D28D9', thumb: '', year: '2023', platform: 'android', category: 'mobile', chips: [[1, 4], [2, 0], [0, 7]] },
  { name: 'Riongo', slug: 'riongo', status: 'dev', hue: '#FF3B30', thumb: '', year: '2026', platform: 'web', category: 'product', chips: [[0, 7], [0, 5], [1, 1]] },
  { name: 'Pawsome.world', slug: 'pawsome-world', status: 'dev', hue: '#EA580C', thumb: '', year: '2026', platform: 'mobile', category: 'mobile', chips: [[0, 0], [1, 1], [2, 0]] },
  { name: 'Logos for Business', slug: 'logos-for-business', status: 'case', hue: '#0F0F13', thumb: '', year: '2021', platform: 'print', category: 'branding', chips: [[2, 0], [2, 1], [2, 4]], gallery: logofolioGallery },
  { name: 'Rock / Metal Stage MD', slug: 'rock-metal-stage-md', status: 'case', hue: '#0F0F13', thumb: '', year: '2022', platform: 'print', category: 'branding', chips: [[2, 0], [2, 3], [2, 4]] }
].map((p, i) => ({ ...p, i18n: PROJECTS_I18N[i], href: `/project/${p.slug}`, gallery: p.gallery || placeholderGallery(p.slug) }));

export function getProjectBySlug(slug) {
  return PROJECTS.find(p => p.slug === slug) || null;
}

export function getAdjacentProject(slug) {
  const i = PROJECTS.findIndex(p => p.slug === slug);
  if (i === -1) return PROJECTS[0];
  return PROJECTS[(i + 1) % PROJECTS.length];
}
