"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const passport_local_1 = require("passport-local");
const bcryptjs_1 = require("bcryptjs");
function initializePassport(passport, getUserByEmail, getUserById) {
    console.log("Passport config init");
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        const user = await getUserByEmail(email);
        console.log("Find user by email");
        if (!user) {
            return done(null, false);
        }
        else {
            if (await (0, bcryptjs_1.compare)(password, user.password)) {
                console.log('Login success');
                return done(null, user);
            }
            else {
                console.log('Login failed');
                return done(null, false);
            }
        }
    }));
    passport.serializeUser((user, done) => {
        console.log("Serialize user");
        return done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        console.log("Deserialize user");
        return done(null, await getUserById(id));
    });
}
exports.initializePassport = initializePassport;
//# sourceMappingURL=passport-config.js.map