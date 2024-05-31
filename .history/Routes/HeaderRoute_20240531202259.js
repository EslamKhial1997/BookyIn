const { Router } = require("express");
const {
  createHeaderService,
  getAllHeaderService,
  getOneHeaderService,
  updateOneHeaderService,
  deleteOneHeaderService,
  uploadImage,
  resizeImage,
} = require("../Services/HeaderService");

const Routes = Router();

Routes.route("/")
  .post(/* uploadImage, resizeImage, */Headerv, createHeaderService)
  .get(getAllHeaderService);
Routes.route("/:id")
  .get(getOneHeaderService)
  .put(updateOneHeaderService)
  .delete(deleteOneHeaderService);

module.exports = Routes;
