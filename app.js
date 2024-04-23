// remember alway the firts steps are 
// npm init 
// then insstall package like npm expresss etc... 
const express = require('express');
const jwt =  require('jsonwebtoken');
const app = express();

// we will get the token only when we login thats why we have included the verify route in the login route


app.get('/api', (req, res)=>{
   res.json({
       message: 'Welcome to our API'
   })
})

// we need to protect this route  
app.post('/api/posts', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'secretykey', (err, authData)=>{
        if (err){
            res.json({
                ERROR: "Some Error"
            })
        }else {
            res.json({
                success : 'Post Created', 
                authData : authData
            })
        }
    })
    res.json({
        post : 'Post Createds'
    })
})
app.post('/api/login',(req,res)=>{
    //Mock user
    const user = {
        id : 1, 
        usersname : 'kartik',
        pasword : 'xyx'
    }
    // in postman hit thi route, then it will give us a token
    jwt.sign({user: user}, 'secretykey', (err, token)=>{
        res.json({
            token
        })
    })
})
// Format of token 
//Authorization : Bearer <access_token> 
function verifyToken(req, res, next){
    // get the auth header file
    const bearerHeader = req.headers['authorization']
    // check if it is not undefined
    if (typeof bearerHeader !== 'undefined'){
        const rawtoken = bearerHeader.split(' ')[1];
        // set the token
        req.token = rawtoken
        next(); 
    }else {
        // forbidden
        res.json({
            MSG : 'Unauthorized'
        })
    }
}
const PORT  = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})