import passport from 'passport';
import {localConfig} from './strategies/local.strategy';
import User from '../models/user.model';

export const passportConfig = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done)=>{
    done(null, user.email);
  });
  passport.deserializeUser((email, done)=>{
    User.findOne({email: email}, (err, user)=>{
      if(err){
      res.json({message: err})
    }else {
      done(null, user);
    }
    })
  });

  localConfig();
}
