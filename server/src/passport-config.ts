import {PassportStatic} from "passport";
import {Strategy} from 'passport-local';
import {compare} from "bcryptjs";

export function initializePassport(passport: PassportStatic, getUserByEmail: Function, getUserById: Function) {
    console.log("Passport config init")
    passport.use(new Strategy({
        usernameField: 'email'
    }, async (email: string, password: string, done: Function)=> {
        const user = await getUserByEmail(email);
        console.log("Find user by email");
        if(!user) {
            return done(null, false);
        } else {
            if(await compare(password, user.password)) {
                console.log('Login success');
                return done(null, user);

            } else {
                console.log('Login failed');
                return done(null, false);
            }
        }
    }));
    passport.serializeUser((user: any, done)=> {
        console.log("Serialize user");
        return done(null, user.id);
    });
    passport.deserializeUser(async (id, done)=> {
        console.log("Deserialize user");
        return done(null, await getUserById(id));
    });
}