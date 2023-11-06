import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.handleHome)
    router.get('/user', homeController.handleUserPage)
    return app.use("/", router);
}
module.exports = initWebRoutes;