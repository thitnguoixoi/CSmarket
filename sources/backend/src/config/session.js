import session from "express-session";
let configSession = (app) => {
    app.use(
        session({
            secret: "thitnguoixoi",
            resave: true,
            saveUninitialized: true,
        })
    );
}
module.exports = configSession;