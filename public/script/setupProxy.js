const proxy = require('http-proxy-middleware');

module.exports=function(app){
    app.use(
       createProxyMiddleware('/ncp:sms:kr:307678834843:minihanasonbo/messages',{
            target:'https://sens.apigw.ntruss.com/sms/v2/services',
            changeOrigin:true
        }),
    );
    
};