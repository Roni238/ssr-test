const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'https://www.mos.ru/rss',
    changeOrigin: true,
    timeout: 20000, // 20 секунд
    proxyTimeout: 20000, // 20 секунд
    pathRewrite: { '^/api/mos': '' },
  });
  return proxy(req, res, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    }
  });
};
