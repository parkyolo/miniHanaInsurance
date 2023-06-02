// API 호출 axios
// function onLoggin() {
//     const code = generateRandomCode(6);


//     const phoneNum = "01063685605";
//     console.log(phoneNum);
//     console.log(access_key);
//     const method = "POST";
//     const space = " ";
//     const newLine = "\n";
//     const url = `https://sens.apigw.ntruss.com/sms/v2/services/${service_id}/messages`;
//     const url2 = `/sms/v2/services/${service_id}/messages`;
//     const date = Date
//         .now()
//         .toString();
//     const hmac = CryptoJS
//         .algo
//         .HMAC
//         .create(CryptoJS.algo.SHA256, secrete_key);
//     hmac.update(method);
//     hmac.update(space);
//     hmac.update(url2);
//     hmac.update(newLine);
//     hmac.update(date);
//     hmac.update(newLine);
//     hmac.update(access_key);
//     const hash = hmac.finalize();
//     const signature = hash.toString(CryptoJS.enc.Base64);

//     console.log(signature);

//     axios({
//         method: method,
//         url: url,
//         headers: {
//             "Content-type": "application/json;charset=utf-8 ",
//             "x-ncp-iam-access-key ": access_key,
//             "x-ncp-apigw-timestamp": date,
//             "x-ncp-apigw-signature-v2": signature
//         },
//         data: {
//             type: "SMS",
//             countryCode: "82",
//             from: "01063685605",
//             content: `하나손해보험 인증번호입니다.`,
//             messages: [

//                 {
//                     to: `${phoneNum}`,
//                     content: '하나손해보험 인증번호는 ' + code + ' 입니다.'
//                 }
//             ]
//         }
//     })
//         .then(res => {
//             console.log(res.data);
//             const $=cheerio.load(html.data);

//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }