const { Router } = require("express");
const {
  Login,
  
  restNewPassword,
} = require("../Services/AuthService");
const {
  LoginValidator,
} = require("../Resuble/AuthvalidatorError");

// const {
//   createUsersValidator,
//   getOneUserValidator,
//   updateOneUserValidator,
//   deleteOneUserValidator,
//   UpdateUserPassword,
// } = require("../Resuble/UsersvalidatorError");

const Routes = Router();


Routes.route("/login").post(LoginValidator, Login);
// Routes.post("/forgetPassword", forgetPassword);
// Routes.post("/restCode", restCodeSent);
Routes.put("/restNewPassword", restNewPassword("password"));
/
module.exports = Routes;
