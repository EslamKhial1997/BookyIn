const { Router } = require("express");
const { Login } = require("../Services/AuthService");

const Routes = Router();

Routes.route("/login").post(Login);  

module.exports = Routes;
