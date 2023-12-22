import express from "express";
import loginController from "../controller/loginController"
import casesController from "../controller/casesController"
import skinsController from "../controller/skinsController"
import usersController from "../controller/usersController"
let router = express.Router();
let initApiRoutes = (app) => {

    router.get('/auth/steam', loginController.handleSteamAuth);//, loginController.redirectHome
    router.get('/auth/steam/return', loginController.handleSteamReturn, loginController.handleSendProfile);
    router.get('/auth/jwt', loginController.getJWT);

    router.get("/users", usersController.readUsers);
    router.get("/users/steamid", usersController.readUser);

    router.put("/users/update/tradeurl", usersController.updateTradeURL);
    router.put("/users/update/wallet", usersController.updateWallet);
    router.delete("/users/delete", usersController.deleteUser);

    // router.get("/skins", skinsController.testAPI);
    // router.post("/skins", skinsController.testAPI);
    // router.put("/skins", skinsController.testAPI);
    // router.delete("/skins", skinsController.testAPI);

    // router.get("/cases", casesController.testAPI);
    // router.post("/cases", casesController.testAPI);
    // router.put("/cases", casesController.testAPI);
    // router.delete("/cases", casesController.testAPI);

    return app.use("/api/v1", router);
}
module.exports = initApiRoutes;