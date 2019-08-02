var notes = require('../controler/controler');
var prod = require('../controler/postProduct');
var pay = require('../controler/paypal');

const express = require('express')
const route = express.Router()

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
       console.log(" Forbidden");
       
        res.sendStatus(403);
    }

    
}


route.post('/backRegister',notes.backRegister)
route.post('/backLogin',notes.backLogin)

route.post('/backAcc',verifyToken,notes.backAcc)

route.post('/backPostProduct',verifyToken,prod.postArticle)


route.get('/image/:im',prod.image)

route.get('/backGetAll',notes.backgetAll)

route.get('/backMyprod/:id',prod.getArticle)


route.post('/paym',pay.postPaypal)
route.get('/success',pay.succesPaypal)



module.exports = route