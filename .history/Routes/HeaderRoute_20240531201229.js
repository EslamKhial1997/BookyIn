const { Router } = require("express");
const {
  createHeaderService,
  getAllHeader,
  getOneHeader,
  updateOneHeader,
  deleteOneHeader,
  uploadImage,
  resizeImage,
} = require("../Services/HeaderServer");

const Routes = Router();

Routes.route("/")
  .post(uploadImage, resizeImage, createHeaderService)
  .get(getAllHeader);
Routes.route("/:id")
  .get(getOneHeader)
  .put(updateOneHeader)
  .delete(deleteOneHeader);

module.exports = Routes;
