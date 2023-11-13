import session from "express-session";
const store = session.MemoryStore();
let configSession = (app) => {
    app.use(
        session({
            secret: "thitnguoixoi",
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 86400,
            },
            store
        })
    );
}
module.exports = configSession;