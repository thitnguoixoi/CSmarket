import express from "express";
import homeController from "../controller/homeController";
import passport from "passport";
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.handleHome)
    router.get('/auth/steam',
        passport.authenticate('steam', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/');
        });
    router.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/');
        });
    router.get('/account', homeController.ensureAuthenticated, homeController.handleAccount);
    router.get('/logout', homeController.handleSteamLogout);

    return app.use("/", router);
}
module.exports = initWebRoutes;