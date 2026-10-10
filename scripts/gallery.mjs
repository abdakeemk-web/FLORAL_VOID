// Builds the gallery filter buttons and image tiles from data/gallery.json.
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'head', label: 'Heads' },
  { id: 'partial', label: 'Partials' },
  { id: 'full', label: 'Full Suits' },
  { id: 'furry', label: 'Fursona Art' },
  { id: 'avatar', label: 'Avatars' },
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
      if (item.type === 'video') return renderVideoTile(item);
      const alt = escapeAttr(item.alt);
      const tag = item.status ? `<span class="tile-tag">${escapeAttr(item.status)}</span>` : '';
      const statusAttr = item.status ? ` data-status="${escapeAttr(item.status)}"` : '';
      if (item.file) {
        return `<li class="tile" data-category="${item.category}">` +
          `<button class="tile-button" type="button" data-full="${item.file}" data-width="${item.fullWidth}" data-height="${item.fullHeight}" data-alt="${alt}"${statusAttr}>` +
          `<img src="${item.file}" width="${item.thumbWidth}" height="${item.thumbHeight}" loading="lazy" decoding="async" alt="${alt}">${tag}` +
          `</button></li>`;
      }
      const base = `/images/portfolio/portfolio-${item.id}`;
      return `<li class="tile" data-category="${item.category}">` +
        `<button class="tile-button" type="button" data-full="${base}-1000.webp" data-width="${item.fullWidth}" data-height="${item.fullHeight}" data-alt="${alt}"${statusAttr}>` +
        `<img src="${base}-480.webp" width="${item.thumbWidth}" height="${item.thumbHeight}" loading="lazy" decoding="async" alt="${alt}">${tag}` +
        `</button></li>`;
    })
    .join('\n');
}

function renderVideoTile(item) {
  const alt = escapeAttr(item.alt);
  const tag = item.status ? `<span class="tile-tag">${escapeAttr(item.status)}</span>` : '';
  const statusAttr = item.status ? ` data-status="${escapeAttr(item.status)}"` : '';
  const creditAttr = item.credit ? ` data-credit="${escapeAttr(item.credit)}"` : '';
  return `<li class="tile" data-category="${item.category}">` +
    `<button class="tile-button tile-video-button" type="button" data-video="${item.video}" data-alt="${alt}"${statusAttr}${creditAttr}>` +
    `<video src="${item.video}" width="${item.width}" height="${item.height}" preload="metadata" muted playsinline aria-hidden="true" tabindex="-1"></video>${tag}` +
    `<span class="tile-play" aria-hidden="true"></span><span class="vh">Play video: ${alt}</span>` +
    `</button></li>`;
}
