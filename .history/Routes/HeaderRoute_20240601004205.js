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

const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(UploadImageService ,resizeImage,Header createHeaderService)
  .get(getAllHeaderService);
Routes.route("/:id")
  .get(getOneHeaderService)
  .put(updateOneHeaderService)
  .delete(deleteOneHeaderService);

module.exports = Routes;
