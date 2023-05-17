const readline = require("readline");

function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
  }

const code=generateRandomCode(6);
console.log(code);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on("line", (line) => {
    
    rl.close();
  }).on("close",function(){
    if(input=code){
        console.log("인증 성공!");
    }
  });
  

  