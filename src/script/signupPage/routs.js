
const send_message = require('./signup')

router.post('/', async (req, res, next) => {
    
    res.setHeader('Content-Type', 'application/json')

    console.log('post is work')
    try {
    	// send_message 모듈을 실행시킨다. 
        await send_message()
        res.send("send message!")
    }catch(err){
        console.log(err)
    }
});

module.exports = router;

