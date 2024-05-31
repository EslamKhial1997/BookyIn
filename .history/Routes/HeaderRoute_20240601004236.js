const { Router } = require("express");
const {
  createHeaderService,
  getAllHeaderService,
  getOneHeaderService,
  updateOneHeaderService,
  deleteOneHeaderService,
  UploadImageService,
  resizeImage,
} = require("../Services/HeaderService");
const { createHeaderValidator } = require("../Resuble/HeaderValidation");

const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(UploadImageService ,resizeImage,createHeaderValidator, createHeaderService)
  .get( getAllHeaderService);
Routes.route("/:id")
  .get(get,getOneHeaderService)
  .put(updateOneHeaderService)
  .delete(deleteOneHeaderService);

module.exports = Routes;
