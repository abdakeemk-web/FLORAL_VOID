// Site-wide QA sweep: links, assets, ids, JSON-LD, sitemap, services, scans.
// Usage: node scripts/qa-check.mjs  (exits non-zero on any failure)
import fs from 'node:fs';
import path from 'node:path';

const R = path.resolve(import.meta.dirname, '..');
const D = path.join(R, 'dist');
const cfg = JSON.parse(fs.readFileSync(path.join(R, 'data/site.config.json'), 'utf8'));
let fails = 0;
const fail = (m) => { fails++; console.log('FAIL ' + m); };
const ok = (m) => console.log('ok   ' + m);

const pages = fs.readdirSync(D).filter((f) => f.endsWith('.html'));

// 1. internal links resolve
{
  const bad = [];
  for (const f of pages) {
    const h = fs.readFileSync(path.join(D, f), 'utf8');
    for (const m of h.matchAll(/href="(\/[^"]*)"/g)) {
      const u = m[1].split('#')[0].split('?')[0];
      if (/\.(css|png|jpg|jpeg|webp|xml|ico)$/.test(u)) continue;
      if (!u) continue;
      const t = u === '/' ? path.join(D, 'index.html') : path.join(D, u + '.html');
      if (!fs.existsSync(t)) bad.push(f + ' -> ' + u);
    }
  }
  bad.length ? fail('dead internal links: ' + bad.join(', ')) : ok('all internal links resolve');
}

// 2. referenced assets exist
{
  const bad = [];
  for (const f of pages) {
    const h = fs.readFileSync(path.join(D, f), 'utf8');
    for (const m of h.matchAll(/(?:src|href)="(\/(?:images|videos|js|css|fonts)\/[^"]*|\/og-image\.jpg|\/favicon\.png|\/apple-touch-icon\.png)"/g)) {
      if (!fs.existsSync(path.join(D, m[1]))) bad.push(f + ' -> ' + m[1]);
    }
  }
  bad.length ? fail('missing assets: ' + bad.join(', ')) : ok('all referenced assets exist');
}

// 3. no duplicate ids per page
{
  const bad = [];
  for (const f of pages) {
    const h = fs.readFileSync(path.join(D, f), 'utf8');
    const seen = new Set();
    for (const m of h.matchAll(/id="([^"]+)"/g)) {
      if (seen.has(m[1])) bad.push(f + '#' + m[1]);
      seen.add(m[1]);
    }
  }
  bad.length ? fail('duplicate ids: ' + bad.join(', ')) : ok('no duplicate ids');
}

// 4. JSON-LD parses
{
  const bad = [];
  for (const f of pages) {
    const h = fs.readFileSync(path.join(D, f), 'utf8');
    for (const m of h.matchAll(/<script type="application\/ld\+json">(.+?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch { bad.push(f); }
    }
  }
  bad.length ? fail('bad JSON-LD in: ' + bad.join(', ')) : ok('all JSON-LD parses');
}

// 5. sitemap + robots
{
  const sm = fs.readFileSync(path.join(D, 'sitemap.xml'), 'utf8');
  const urls = [...sm.matchAll(/<loc>(.+?)<\/loc>/g)].map((m) => m[1]);
  urls.length === 6 ? ok('sitemap has all 6 URLs') : fail('sitemap has ' + urls.length + ' URLs');
  const robots = fs.readFileSync(path.join(D, 'robots.txt'), 'utf8');
  robots.includes('/sitemap.xml') ? ok('robots references sitemap') : fail('robots missing sitemap');
}

// 6. ?service= links valid
{
  const vals = new Set(cfg.services.map((s) => s.value));
  const bad = [];
  for (const f of pages) {
    const h = fs.readFileSync(path.join(D, f), 'utf8');
    for (const m of h.matchAll(/contact\?service=([a-z-]+)/g)) {
      if (!vals.has(m[1])) bad.push(f + ' -> ' + m[1]);
    }
  }
  bad.length ? fail('bad ?service= links: ' + bad.join(', ')) : ok('all ?service= links valid');
}

// 7. no stale provider / secret refs in dist
{
  const bad = [];
  for (const f of [...pages, ...fs.readdirSync(path.join(D, 'js'))]) {
    const sub = f.endsWith('.html') ? '' : 'js/';
    const h = fs.readFileSync(path.join(D, sub + f), 'utf8');
    if (/resend/i.test(h) || /\/api\/commission/.test(h) || /RESEND_API_KEY/.test(h)) bad.push(sub + f);
  }
  bad.length ? fail('stale provider refs in: ' + bad.join(', ')) : ok('no stale provider/secret refs in dist');
}

// 8. no lorem/TODO debris in dist
{
  const bad = [];
  for (const f of pages) {
    const h = fs.readFileSync(path.join(D, f), 'utf8');
    if (/lorem ipsum|TODO|FIXME/i.test(h)) bad.push(f);
  }
  bad.length ? fail('debris in: ' + bad.join(', ')) : ok('no lorem/TODO debris');
}

// 9. gallery counts sane
{
  const g = fs.readFileSync(path.join(D, 'gallery.html'), 'utf8');
  const all = g.match(/data-filter="all" aria-pressed="true">All <span class="chip-count">(\d+)<\/span>/);
  const tiles = (g.match(/class="tile"/g) || []).length;
  all && Number(all[1]) === tiles
    ? ok('gallery count consistent (' + tiles + ' tiles)')
    : fail('gallery count mismatch (filter=' + (all && all[1]) + ' tiles=' + tiles + ')');
}

console.log(fails ? '\n' + fails + ' CHECK(S) FAILED' : '\nAll 9 checks passed');
process.exit(fails ? 1 : 0);
