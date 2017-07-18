import crypto from 'crypto';

export const encode = function(payload, secret){
  const algorithm = 'HS256';
  const header = {
    typ: 'JWT',
    algo: algorithm
  }

  let jwt = `${base64encode(JSON.stringify(header))}.${base64encode(JSON.stringify(payload))}.`;

  jwt += sign(jwt, secret);
  return jwt;
}

export const decode = function(token){
  if(!token){
    throw new Error('No token received')
    
  }
  const segments = token.split('.')
  if(segments.length !== 3){
    throw new Error('Invalid token');
  }
  const header = JSON.parse(base64decode(segments[0]));
  const payload = JSON.parse(base64decode(segments[1]));
  const signature = `${segments}.${payload}`
  return payload;
}

function base64encode(str){
  return new Buffer(str).toString('base64');
}

function base64decode(str){
  return new Buffer(str, 'base64').toString();
}

function sign(str, key){
  return crypto.createHmac('sha256', key).update(str).digest('base64');
}
