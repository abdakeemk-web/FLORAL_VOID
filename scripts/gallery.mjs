// Builds the gallery filter buttons and image tiles from data/gallery.json.
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'head', label: 'Heads' },
  { id: 'partial', label: 'Partials' },
  { id: 'full', label: 'Full Suits' },
  { id: 'furry', label: 'Furry' },
  { id: 'wip', label: 'Work in Progress' },
];

const escapeAttr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function renderFilters(items) {
  const visible = items.filter((item) => !item.hidden);
  return categories
    .map(({ id, label }) => {
      const count = id === 'all' ? visible.length : visible.filter((item) => item.category === id).length;
      const pressed = id === 'all' ? 'true' : 'false';
      return `<button class="chipbtn" type="button" data-filter="${id}" aria-pressed="${pressed}">${label} <span class="chip-count">${count}</span></button>`;
    })
    .join('');
}

export function renderTiles(items) {
  return items
    .filter((item) => !item.hidden)
    .map((item) => {
      const base = `/images/portfolio/portfolio-${item.id}`;
      const alt = escapeAttr(item.alt);
      return `<li class="tile" data-category="${item.category}">` +
        `<button class="tile-button" type="button" data-full="${base}-1000.webp" data-width="${item.fullWidth}" data-height="${item.fullHeight}" data-alt="${alt}">` +
        `<img src="${base}-480.webp" width="${item.thumbWidth}" height="${item.thumbHeight}" loading="lazy" decoding="async" alt="${alt}">` +
        `</button></li>`;
    })
    .join('\n');
}
