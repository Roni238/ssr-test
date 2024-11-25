import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://www.mos.ru/rss',
  changeOrigin: true,
  pathRewrite: {
    '^/api/mos': '',
  },
});
