import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userRepository from '../repositories/UserRepository.js';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, _username, _password, done) => done(null, req),
  ),
);

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, _username, _password, done) => done(null, req),
  ),
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
      issuer: 'mana-api-server',
      audience: 'mana-admin',
    },
    async (jwtPayload, done) => {
      try {
        const userExists = await userRepository.userExists(jwtPayload.username);

        if (userExists) {
          done(null, true);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

export default passport;
