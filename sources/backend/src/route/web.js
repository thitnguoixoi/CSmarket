import express from "express";
import mainController from "../controller/mainController";
import loginController from "../controller/loginController"
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', mainController.handleHome)
    router.get('/auth/steam', loginController.handleSteamAuth, loginController.redirectHome);
    router.get('/auth/steam/return', loginController.handleSteamReturn, loginController.redirectHome);
    router.get('/account', mainController.handleAccount);//mainController.ensureAuthenticated,
    router.get('/logout', mainController.handleSteamLogout);
    return app.use("/", router);
}
module.exports = initWebRoutes;