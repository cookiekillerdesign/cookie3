export function initials(name) {
  return name.replace(/[^A-Za-zА-Яа-я0-9 ]/g, '').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${Math.min(255, (n >> 16) + 24)} ${Math.min(255, ((n >> 8) & 255) + 24)} ${Math.min(255, (n & 255) + 24)})`;
}

export function stripeBg(hue) {
  return `repeating-linear-gradient(45deg,${hue},${hue} 14px,${shade(hue)} 14px,${shade(hue)} 28px)`;
}
