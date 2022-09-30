const passport = require('passport');                       
const LocalStrategy = require('passport-local').Strategy;   
const Usuario = require('../models/Usuario')

passport.use(new LocalStrategy({                  
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  Usuario.findOne({ where : { email: email }}).then(function (user) {
    if (!user || !user.validatePassword(password)) {
      return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
    }
    return done(null, user);
  }).catch(done);
}));