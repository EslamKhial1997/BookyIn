const { Router } = require("express");

const { HeaderValidation } = require("../Resuble/HeaderValidation");

const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(uploadImage, resizeImage, HeaderValidation, )
  .get(getAllHeaderService);
Routes.route("/:id")
  .get(getOneHeaderService)
  .put(updateOneHeaderService)
  .delete(deleteOneHeaderService);

module.exports = Routes;
