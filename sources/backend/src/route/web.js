import express from "express";
import homeController from "../controller/homeController";
import loginController from "../controller/loginController"
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.handleHome)
    router.get('/auth/steam', loginController.handleSteamAuth, loginController.redirectHome);
    router.get('/auth/steam/return', loginController.handleSteamReturn, loginController.redirectHome);
    router.get('/account', homeController.handleAccount);//homeController.ensureAuthenticated,
    router.get('/logout', homeController.handleSteamLogout);
    return app.use("/", router);
}
module.exports = initWebRoutes;