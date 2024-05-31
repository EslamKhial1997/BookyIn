const { Router } = require("express");
const {
  createHeaderService,
  getAllHeaderService,
  getOneHeaderService,
  updateOneHeaderService,
  deleteOneHeaderService,
  uploadImage,
  resizeImage,
} = require("../Services/HeaderServer");

const Routes = Router();

Routes.route("/")
  .post(uploadImage, resizeImage, createHeaderService)
  .get(getAllHeaderService);
Routes.route("/:id")
  .get(getOneHeaderService)
  .put(updateOneHeaderService)
  .delete(deleteOneHeaderService);

module.exports = Routes;
