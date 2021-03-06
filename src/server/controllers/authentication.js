import jwt from 'jsonwebtoken';

import { secretKey } from 'server/configs';
import { AUTH_TOKEN } from 'shared/system/constants';

import User from 'server/models/user';

export function generateToken(user) {
  const token = jwt.sign({
    sub: user._id,
    name: user.name,
    avatar: user.avatar || 'https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg',
    iat: new Date().getTime()
  }, secretKey);
  return token;
}

export function signup(req, res, next) {
  const { username, password } = req.body;

  if (! username || ! password) {
    return res.status(422)
      .json({
        message: 'You must provide username and password'
      });
  }

  User.findOne({username: username}, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).json({ error: 'Username is in use' });
    }

    const user = new User({
      username: username,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      const token = generateToken(user);
      res.json({ token });
    });

  });
}

export function login(req, res, next) {
  res.json({ token: generateToken(req.user) });
}

export function oAuthCallback(req, res, next) {
  res.cookie(AUTH_TOKEN, generateToken(req.user), { 
    maxAge: 60 * 30 * 1000, 
    // httpOnly: true 
  });
  res.redirect('/');
}