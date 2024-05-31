const { Router } = require("express");
const {
  createUsers,
  getUsers,
    updateUser,
    deleteUser,
    getUser,
  //   updatePassword,
  uploadImage,
  resizeImageUsers,
  updateLoggedUserPassword,
    getLoggedUserData,
  //   updateLoggedUserData,
  //   createpasswordDashboard,
  //   updatePasswordDashboard,
  //   LoginDashboard,
  //   updateLoggedUserPasswordDashboard,
} = require("../Services/UsersService");
const {
  createUsersValidator,
  getOneUserValidator,
  deleteOneUserValidator,
  updateOneUserValidator,
  //   UpdateUserPassword,
  //   updateLoggedUserValidator,
  //   LoginDashboardValidator,
} = require("../Resuble/UsersvalidatorError");
const {
  protect,
  allowedTo,
  //   forgetPassword,
  //   restCodeSent,
  //   restNewPassword,
} = require("../Services/AuthService");

const Routes = Router();

// // Only Access the Logged Users
Routes.use(protect);
 Routes.get("/getMe", getLoggedUserData, getUser);
// Routes.patch(
//   "/updateMe",
//   uploadImage,
//   resizeImageUsers,
//   updateLoggedUserValidator,
//   updateLoggedUserData
// );
// Routes.put("/changePassword/:id", UpdateUserPassword, updatePassword);
Routes.put("/changeUserPassword", updateLoggedUserPassword);
// Only Access the Admin
Routes.use(allowedTo("admin", "manger"));
Routes.route("/").post(
  uploadImage,
  resizeImageUsers,
  createUsersValidator,
  createUsers
).get(getUsers);
Routes.route("/:id")
  .get(getOneUserValidator, getUser)
  .patch(uploadImage, resizeImageUsers, updateOneUserValidator, updateUser)
  .delete(deleteOneUserValidator, deleteUser);
module.exports = Routes;
