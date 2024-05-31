const { Router } = require("express");

const {
  createHeaderService,
  getOneHeaderService,
  getAllHeaderService,
  createHeaderOnCategory,
  updateHeaderService,
  deleteHeaderService,
  uploadImage,
  resizeImage,
} = require("../Services/HeaderService");
const {
  HeaderValidation,
  getHeaderByIdValidator,
  updateHeaderValidation,
  deleteHeaderByIdValidator,
} = require("../Resuble/HeaderValidation");

const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(
    uploadImage,
    resizeImage,
   

    createHeaderService
  )
  .get(getAllHeaderService);
Routes.route("/:id")
  .get( getOneHeaderService)
  .put(
    uploadImage,
    resizeImage,
  
    updateHeaderService
  )
  .delete(deleteHeaderByIdValidator, deleteHeaderService);

module.exports = Routes;
