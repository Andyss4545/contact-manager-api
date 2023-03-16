const asyncHandler = require('express-async-handler');
 const jwt = require("jsonwebtoken"); 


 const validateToken = asyncHandler(async(req, res, next) => {
        let token;
        let authHeader = req.headers.Authorization ||  req.headers.authorization;
        if(authHeader && authHeader.startsWith('Bearer')){
              // extract the token from the authHeader and use the value of the first index
              token = authHeader.split(" ")[1]  
              // verify the token using jwt
              jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                           if(err){
                               res.status(401)
                               throw new Error('User is not authorizaed')
                           }
                           console.log(decoded.user)

                           // verified the token  and extract info embedded in the token
                           req.user = decoded.user 
                           next()
              });

              if(!token){
                  res.status(401) // user not authorized
                  throw new Error("User is not authorized or token is missing")
              }
        }
 });

 module.exports = validateToken;