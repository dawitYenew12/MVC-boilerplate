import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from './config.js';
import { tokenTypes } from './token.js';
import userService from '../services/user.service.js';

const jwtOptions = {
    secretOrKey: config.jwt.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

export const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payLoad, done){
    try {
        if(jwt_payLoad != tokenTypes.ACCESS){
            throw new Error("Invalid token type");
        }
        const user = userService.getUserById(jwt_payLoad.subject);
        if(!user){
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
})