const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'https://lenta.ru/rss/news',
    changeOrigin: true,
    pathRewrite: {
      '^/api/lenta': '',
    },
  });
  return proxy(req, res, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    }
  });
};
