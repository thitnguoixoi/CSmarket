import passport from "passport";
// config passport for OAuth
const configPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
}
module.exports = configPassport;