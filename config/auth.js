const secret = require('./secret');
const { expressjwt } = require('express-jwt');

//Bearer <JWT>
function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {
    required: function(req,res,next){
        if(!req.auth || !req.auth.username){
            return res.sendStatus(401);
        }
        next();
    },
    hasPaymentMethod: function(req,res,next){
        if(!req.auth || !req.auth.username){
            return res.sendStatus(401);
        }
        if(!req.auth.tarjeta || req.auth.tarjeta == ''){
            return res.sendStatus(403);
        }
        next();
    },
    optional: expressjwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}

module.exports = auth;