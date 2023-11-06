import passport from "passport";
const configPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
}
module.exports = configPassport;