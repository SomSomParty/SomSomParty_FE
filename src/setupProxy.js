const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        "/api",
        createProxyMiddleware( {
            target: 'http://localhost:8080',
            pathRewrite: {
                '^/api':''
            },
            changeOrigin: true,
        })
    )
      // 웹소켓 프록시 설정
  app.use(
    "/ws-chat",
    createProxyMiddleware({
      target: "http://localhost:8080", // 웹소켓 서버 주소
      ws: true, // 웹소켓을 사용할 수 있도록 설정
      changeOrigin: true,
    })
  );

};