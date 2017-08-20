import crypto from 'crypto';
import {
  config
} from './package-config';

export const encode = function(payload) {
  const algorithm = 'HS256';
  const header = {
    typ: 'JWT',
    algo: algorithm
  }

  let jwt = `${base64encode(JSON.stringify(header))}.${base64encode(JSON.stringify(payload))}.`;

  jwt += sign(jwt, config.secret);
  return jwt;
}

export const decode = function(req) {
  if(!req.headers.authorization){
    throw new Error('No token found')
  } else {
  const token = req.headers.authorization.split(' ')[1];
  const segments = token.split('.')
  if (segments.length !== 3) {
    throw new Error('Invalid token');
  }
  const header = segments[0];
  const payload = segments[1];
  const tokenSign = segments[2];
  const signature = `${header}.${payload}.`;
  let jwt = sign(signature, config.secret);
  if (jwt === tokenSign) {
    return JSON.parse(base64decode(segments[1]))
  } else {
    throw new Error('Invalid token');
  }
}
}

function base64encode(str) {
  return new Buffer(str).toString('base64');
}

function base64decode(str) {
  return new Buffer(str, 'base64').toString();
}

function sign(str) {
  return crypto.createHmac('sha256', config.secret).update(str).digest('base64');
}