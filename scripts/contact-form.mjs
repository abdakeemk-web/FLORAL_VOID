// Builds the grouped service <option> list for the commission form from data/site.config.json,
// so the form, the API and the pricing links always use the same eight services.
const groups = [
  { label: 'Fursuits', match: (service) => service.value.startsWith('fursuit-') },
  { label: 'Digital and design', match: (service) => ['fursona-design', 'vrchat-avatar', 'vtuber-avatar'].includes(service.value) },
  { label: 'Something else', match: (service) => service.value === 'other' },
];

const escapeAttr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function renderServiceOptions(services) {
  const options = groups.map((group) => {
    const items = services
      .filter(group.match)
      .map((service) => {
        const isQuote = service.price === 'Request a Quote';
        const label = `${service.label} — ${service.price}`;
        return `<option value="${service.value}" data-price="${escapeAttr(service.price)}" data-quote="${isQuote}">${escapeAttr(label)}</option>`;
      })
      .join('');
    return `<optgroup label="${group.label}">${items}</optgroup>`;
  });
  return `<option value="" selected disabled>Choose a service</option>${options.join('')}`;
}
