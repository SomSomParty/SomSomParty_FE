const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'https://somsomparty.store', // 로드밸런서 DNS https 적용
      pathRewrite: {
        '^/api': ''
      },
      changeOrigin: true,
    })
  );

};