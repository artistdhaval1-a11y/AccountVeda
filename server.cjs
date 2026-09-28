const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const target = 'https://ais-pre-gu4fxal2xf5sqxfiqtgrx7-1066915673590.asia-southeast1.run.app';
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true, xfwd: true, secure: true, ws: true });

proxy.on('proxyRes', (proxyRes, req) => {
  const location = proxyRes.headers.location;
  if (location && location.startsWith(target)) proxyRes.headers.location = location.replace(target, 'https://' + req.headers.host);
});
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err.message);
  if (res && !res.headersSent) res.status(502).send('AccountVeda service temporarily unavailable.');
});

app.get('/health', (_req, res) => res.json({ ok: true, service: 'accountveda' }));
app.use((req, res) => proxy.web(req, res));

const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, '0.0.0.0', () => console.log('AccountVeda proxy listening on ' + port));
server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));
