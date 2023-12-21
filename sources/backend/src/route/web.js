import express from "express";
import mainController from "../controller/mainController";
import loginController from "../controller/loginController"
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', mainController.handleHome)
    router.post('/delete-user/:id', mainController.handleDeleteUser);
    router.post('/update-user-tradeurl/:id', mainController.handleUpdatedTradeURL);
    router.post('/update-user-wallet/:id', mainController.handleUpdatedWallet);
    return app.use("/", router);
}
module.exports = initWebRoutes;