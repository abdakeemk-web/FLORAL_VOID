// Local preview server: serves dist/ as static files.
// The commission form posts directly to Web3Forms from the browser, so there is
// no local API to run. To try a real submission locally, put your Web3Forms access
// key in data/site.config.json first (see README.md), then rebuild.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../dist');
const port = Number(process.env.PORT) || 8000;

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp',
  '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain',
};

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  let file = path.join(root, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!path.extname(file)) file += '.html';
  if (!file.startsWith(root) || !fs.existsSync(file)) {
    res.statusCode = 404;
    file = path.join(root, '404.html');
  }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`FLORAL VOID preview: http://localhost:${port}`));
