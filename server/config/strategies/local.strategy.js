import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import User from '../../models/user.model';


export function localConfig() {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    User.find({})
      .then((data) => {
        if (data.length > 0) {
          console.log('we already have a user')
          return done(null, false, {
            message: 'Sorry, can\'t have more than one user.'
          })
        } else {
          User.findOne({
            email: username
          }, (err, user) => {
            if (err) {
              return done(err);
            } else if (user) {
              return done(null, false, {
                message: 'This email is already in use'
              })
            } else if (!user) {
              const newUser = new User({
                email: username
              });
              newUser.password = newUser.generateHash(password);
              newUser.save(function(err) {
                if (err) {
                  return done(err);
                } else {
                  return done(null, newUser)
                }
              })
            }
          })
        }
      })

  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    User.findOne({
      email: username
    }, (err, user) => {
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false, {
          message: "Invalid email"
        })
      } else if (!user.validPassword(user, password)) {
        return done(null, false, {
          message: "Invalid Password"
        })
      } else if (user) {
        return done(null, user)
      }
    })
  }))
}