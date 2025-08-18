const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/subgraphs',
        createProxyMiddleware({
            target: 'https://api.thegraph.com',
            changeOrigin: true,
            secure: true,
            logLevel: 'debug',
        })
    );

    app.use(
        '/index-node',
        createProxyMiddleware({
            target: 'https://api.thegraph.com',
            changeOrigin: true,
            secure: true,
            logLevel: 'debug',
        })
    );
}; 