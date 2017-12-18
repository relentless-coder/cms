import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import {
  passportConfig
} from '../config/passport.config';
import {
  config
} from '../config/package-config';
import {
  encode
} from '../config/jwt.token.js';
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const app = express();
passportConfig(app);

router.post('/admin/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(404).json(info);

    } else {
      let payload = {_id: user._id}
      let token = encode(payload);
      return res.status(200).json({
        token: token
      });
    }

  })(req, res, next);
});

router.post('/admin/new', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err);
    } else if (!user || info) {
      console.log('our info is ', info)
      return res.status(403).json({
        message: info.message
      });
    } else {
      return res.status(200).json(user);

    }
  })(req, res, next);
});

export default router