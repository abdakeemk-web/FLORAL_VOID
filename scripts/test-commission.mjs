// Tests the Web3Forms commission form wiring without sending anything:
// no network calls, no real submissions. Run with: node scripts/test-commission.mjs
// (Run `node scripts/build.mjs` first so dist/ is fresh.)
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { renderServiceOptions } from './contact-form.mjs';

const root = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const config = JSON.parse(read('data/site.config.json'));
const contactSrc = read('src/pages/contact.html');
const contactJs = read('src/js/contact.js');

const tests = [];
const test = (name, fn) => tests.push([name, fn]);

const EXPECTED_SERVICES = [
  ['fursuit-head', 'Fursuit — Head Only', '$1,500+'],
  ['fursuit-mini-partial', 'Fursuit — Mini Partial', '$2,700+'],
  ['fursuit-partial', 'Fursuit — Partial', '$5,000+'],
  ['fursuit-full', 'Fursuit — Full Suit', '$7,000+'],
  ['fursona-design', 'Fursona Design', 'Request a Quote'],
  ['vrchat-avatar', 'VRChat Avatar', 'Request a Quote'],
  ['vtuber-avatar', 'VTuber Avatar', 'Request a Quote'],
  ['other', 'Other / Custom Request', 'Request a Quote'],
];

test('all eight services are in the central config with the confirmed prices', () => {
  assert.equal(config.services.length, 8);
  for (const [value, label, price] of EXPECTED_SERVICES) {
    const service = config.services.find((s) => s.value === value);
    assert.ok(service, `missing service ${value}`);
    assert.equal(service.label, label);
    assert.equal(service.price, price);
  }
});

test('the rendered service selector contains all eight options', () => {
  const html = renderServiceOptions(config.services);
  for (const [value, label, price] of EXPECTED_SERVICES) {
    assert.ok(html.includes(`value="${value}"`), `missing option ${value}`);
    assert.ok(html.includes(`${label} — ${price}`), `missing label ${label}`);
  }
});

test('pricing-page preselection links match real service values', () => {
  const values = new Set(config.services.map((s) => s.value));
  for (const page of ['src/pages/pricing.html', 'src/pages/services.html']) {
    const src = read(page);
    for (const match of src.matchAll(/\?service=([a-z-]+)/g)) {
      assert.ok(values.has(match[1]), `${page} links to unknown service ${match[1]}`);
    }
  }
});

test('the form posts to Web3Forms, never to the removed /api/commission', () => {
  assert.ok(contactJs.includes('https://api.web3forms.com/submit'));
  assert.ok(!contactJs.includes('/api/commission'));
});

test('the submission payload contains every required commission field', () => {
  for (const field of ['access_key', 'subject', 'from_name', 'name', 'email', 'discord', 'service', 'budget', 'description', 'character', 'references', 'notes', 'termsAccepted', 'botcheck']) {
    assert.ok(contactJs.includes(`'${field}'`) || contactJs.includes(`"${field}"`), `payload missing ${field}`);
  }
});

test('the applicant email field is used so replies reach the applicant', () => {
  assert.ok(contactSrc.includes('name="email"'), 'form must keep an input named email');
  assert.ok(contactJs.includes("payload.append('email', data.email)"), 'email must be submitted for Reply-To');
});

test('honeypot spam protection is present and quiet', () => {
  assert.ok(contactSrc.includes('name="botcheck"'), 'form must keep the botcheck honeypot');
  assert.ok(contactJs.includes('data.botcheck'), 'script must check the honeypot');
  assert.ok(!contactSrc.includes('companyWebsite') && !contactJs.includes('companyWebsite'), 'old honeypot name must be gone');
});

test('no fake success: success requires a real Web3Forms response and never promises a confirmation email', () => {
  assert.ok(contactJs.includes('result.body && result.body.success'), 'success must require body.success');
  assert.ok(!contactJs.includes('confirmation email has been sent'), 'must not promise a confirmation email');
  assert.ok(!contactJs.includes('confirmationSent'), 'old confirmation flag must be gone');
});

test('built contact page carries the access-key placeholder until the real key is pasted', () => {
  const built = read('dist/contact.html');
  assert.ok(built.includes('name="access_key"'), 'built form must include the access_key input');
  assert.ok(built.includes('WEB3FORMS_ACCESS_KEY') || /^[0-9a-f-]{8,}$/.test(config.forms.accessKey), 'key must be the placeholder or a real key');
  assert.ok(!built.includes('RESEND_API_KEY'), 'built page must not reference the old provider');
});

test('no previous-provider code, variables or endpoints remain in code, config or built output', () => {
  for (const file of ['src/pages/contact.html', 'src/js/contact.js', 'data/site.config.json', 'scripts/build.mjs', 'scripts/dev-server.mjs', 'scripts/contact-form.mjs', 'package.json', 'vercel.json']) {
    assert.ok(!/resend/i.test(read(file)), `${file} still mentions the old provider`);
  }
  for (const file of ['dist/contact.html', 'dist/js/contact.js']) {
    assert.ok(!/resend/i.test(read(file)), `${file} still mentions the old provider`);
  }
  assert.ok(!fs.existsSync(path.join(root, 'api')), 'api/ serverless folder must be removed');
  assert.ok(!/COMMISSION_FROM_EMAIL|RESEND_API_KEY/.test(read('vercel.json')), 'Vercel config must not carry old provider variables');
});

test('owner notification subject names the service and applicant', () => {
  assert.ok(contactJs.includes('New commission application: '), 'subject line must identify the application');
});

let failed = 0;
for (const [name, fn] of tests) {
  try {
    await fn();
    console.log(`ok   ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL ${name}\n     ${error.message}`);
  }
}
console.log(failed ? `\n${failed} test(s) failed` : `\nAll ${tests.length} tests passed`);
process.exit(failed ? 1 : 0);
