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
const {
  createHeaderValidator,
  getHeaderByIdValidator,
  updateHeaderValidation,
  deleteHeaderByIdValidator,
} = require("../Resuble/HeaderValidation");

const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(
    UploadImageService,
    resizeImage,
    createHeaderValidator,
    createHeaderService
  )
  .get(getAllHeaderService);
Routes.route("/:id")
  .get(getHeaderByIdValidator, getOneHeaderService)
  .put(
    UploadImageService,
    resizeImage,
    updateHeaderValidation,
    updateOneHeaderService
  )
  .delete(deleteHeaderByIdValidator, deleteOneHeaderService);

module.exports = Routes; 
 