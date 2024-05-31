const { Router } = require("express");
const {
  Login,
  
  restNewPassword,
} = require("../Services/AuthService");



const Routes = Router();


Routes.route("/login").post(LoginValidator, Login);

Routes.put("/restNewPassword", restNewPassword("password"));
module.exports = Routes;
