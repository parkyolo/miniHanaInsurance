const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const axios = require('axios');
const CryptoJS = require('crypto-js');
const Sentry = require('@sentry/node');
require("dotenv").config();
const route = express.Router();
const publicPath = path.join(__dirname, '../../../public');
const AxiosError=require('axios');


Sentry.init({
  dsn: "https://425afebcea854774b19e9845cb17ff59@o4505282355331072.ingest.sentry.io/4505282362081280",
  integrations: [
    // enable HTTP calls tracing
    // new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    // ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.2,
});

app.use(Sentry.Handlers.requestHandler());

app.use(express.static(publicPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'html/mainPage/mainPage.html'));
});
  
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 401 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
// app.use(Sentry.Handlers.requestHandler(
//   {
//     request:true,
//     severName:true,
  
//   }

// ));
// TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());
// 루트 엔드포인트 처리


  app.post('/increment', (req, res) => {
    const number = req.body.number;
    const inputCode=req.body.code;
    console.log("서버로 넘어온 넘버 : ",number);
   
      const result = onLoggin(number,inputCode);
      // console.log(result);
      res.send(result.toString());
      
    
});

// axios.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     Sentry.captureException(error);
//     return Promise.reject(error);
//   },
// );



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
console.log('hello');



function generateRandomCode(n) {
  let str = ''
  for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
  }
  return str
}


function onLoggin(number,inputCode) 
  {
    const access_key=process.env.NEXT_PUBLIC_ACCESS_KEY;
    const secrete_key=process.env.NEXT_PUBLIC_SECRETE_KEY;
    const service_id=process.env.NEXT_PUBLIC_SERVICE_ID;
    const phoneNum=number;
    const code=inputCode;

    // console.log("onLoggin 접속완료! : "+phoneNum);
  
    console.log(access_key);
    const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${service_id}/messages`;
      const url2 = `/sms/v2/services/${service_id}/messages`;
  
  
      const finErrCode = 404;
      const axios = require('axios');
      const CryptoJS = require('crypto-js');
      const date = Date.now().toString();
  
  
      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secrete_key);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(access_key);
      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);
  
  
  
      axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": access_key,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        // request는 body였지만 axios는 data다
        data: {
            type: "SMS",
            countryCode: "82",
            from: "01063685605",
            // 원하는 메세지 내용
            content: `하나손해보험 인증번호입니다.`,
            messages: [
            // 신청자의 전화번호
                { to:  `${phoneNum}`,
  
                 content:'하나손해보험 인증번호는 '+ code +'입니다.'
                },],
        },

      }).then(res => {
      
        // console.log(res.data);
    })
        .catch(err => {
          // const a=JSON.parse(err.data);
          // console.log("에러코드는"+a.code);
  
            console.log(err.response.status);
            return err.response.status;
        })


  
        // .then(async (response: AxiosResponse) => {
        //   resolve(response.data);
        // })
        // .catch(async (error: AxiosError) => {
        //   Sentry.captureException(error);
        //   reject(error);
        // });
  }
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });
