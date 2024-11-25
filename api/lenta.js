import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://lenta.ru/rss/news',
  changeOrigin: true,
  pathRewrite: {
    '^/api/lenta': '',
  },
});
