import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import {passportConfig} from '../config/passport.config';
import {encode} from '../config/jwt.token.js';
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const app = express();
passportConfig(app);

router.post('/admin/login', (req, res, next)=>{
  passport.authenticate('local-login', (err, user, info)=> {
    if (err) {
      return next(err);
    }else if (!user) {
      return res.json(info)

    }else {
      const userObj = user.toObject();
      delete userObj.password;
      console.log(`User is ${userObj}`);
      let token = encode(userObj, 'inav');
      return res.status(200).json({token: token, user: userObj})
    }

  })(req, res, next);
})

router.post('/admin/new',  (req, res, next)=>{
  passport.authenticate('local-signup', (err, user, info)=> {
    if (err) {
      return next(err);
    }else if (!user) {
      return res.json({message: info.message});
    } else {
      res.json(user);
      res.redirect('/admin/home')
    }
  })(req, res, next);
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/admin/login');
})

export default router
