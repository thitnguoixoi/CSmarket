import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initApiRoutes from "./route/api"
import passport from "./config/passport";
import cookieParser from "cookie-parser"
import configCORS from "./config/cors"
require('dotenv').config();
let app = express();

configCORS(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
app.use(cookieParser())

passport(app);
require("./config/steamapi")(app);
initApiRoutes(app);



let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port " + port)
})