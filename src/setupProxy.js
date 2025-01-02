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
  
  // 웹소켓 프록시 설정
  app.use(
    "/ws-chat",
    createProxyMiddleware({
      target: 'https://somsomparty.store', // 로드밸런서 DNS https 적용
      ws: true, // 웹소켓 사용
      changeOrigin: true,
    })
  );
};