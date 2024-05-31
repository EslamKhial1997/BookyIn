const { Router } = require("express");
const {
  createQuestionTypeService,
  getAllQuestionType,
  getOneQuestionType,
  updateOneQuestionType,
  deleteOneQuestionType,
  uploadImage,
  resizeImage,
} = require("../Services/QuestionTypeServer");
const { allowedTo, protect } = require("../Services/AuthService");
const Routes = Router();
Routes.use(protect,allowedTo("admin"));
Routes.route("/")
  .post(protect, uploadImage, resizeImage, createQuestionTypeService)
  .get(protect, getAllQuestionType);
Routes.route("/:id")
  .get(protect, getOneQuestionType)
  .put(protect, updateOneQuestionType)
  .delete(protect, deleteOneQuestionType);

module.exports = Routes;
