const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'http://somparty-loadbalancer-2037870297.ap-northeast-2.elb.amazonaws.com', // 로드밸런서 DNS
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
      target: 'http://somparty-loadbalancer-2037870297.ap-northeast-2.elb.amazonaws.com', // 로드밸런서 DNS
      ws: true, // 웹소켓 사용
      changeOrigin: true,
    })
  );
};