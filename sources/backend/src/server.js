import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import passport from "./config/passport";
import session from "./config/session"
import connection from "./config/connectDB"
require('dotenv').config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);

session(app);
passport(app);
initWebRoutes(app);
//test DB
connection()



let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port " + port)
})