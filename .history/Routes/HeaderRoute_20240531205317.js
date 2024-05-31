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
const { HeaderValidation } = require("../Resuble/HeaderValidation");

const Routes = Router({ mergeParams: true });
Routes.route("/")
  .post(/* uploadImage, resizeImage, */ createHeaderService)
  .get(getAllHeaderService);
Routes.route("/:id")
  .get(getOneHeaderService)
  .put(updateOneHeaderService)
  .delete(deleteOneHeaderService);

module.exports = Routes;
