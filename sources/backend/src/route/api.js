import express from "express";
import loginController from "../controller/loginController"
import casesController from "../controller/casesController"
import skinsController from "../controller/skinsController"
import usersController from "../controller/usersController"
import { checkUserJWT, checkUserPermisson } from "../middleware/jwtactions"
let router = express.Router();
let initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermisson,);
    //everyone
    router.get('/auth/steam', loginController.handleSteamAuth);//, loginController.redirectHome
    router.get('/auth/steam/return', loginController.handleSteamReturn, loginController.handleSendProfile);
    router.get('/jwt/steamid', loginController.getJWT);

    //user, trader, admin
    router.get('/logout', loginController.handleLogout)
    router.get("/users", usersController.readUsers);
    router.get("/users/steamid", usersController.readUser);
    router.put("/users/update/tradeurl", usersController.updateTradeURL);
    //admin
    router.put("/users/update/wallet", usersController.updateWallet);
    router.delete("/users/delete", usersController.deleteUser);
    router.put("/users/update/role", usersController.updateWallet); //ch làm

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