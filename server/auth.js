const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    console.log("ASK")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
        next();
    }else{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(user!=null){
            req._id = user._id; 
            req.name = user.name; 
        }
        next();
    })}
}

module.exports = {authenticateToken};