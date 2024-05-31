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

const Routes = Router();

Routes.route("/").post(uploadImage,resizeImage,createQuestionTypeService).get(getAllQuestionType);
Routes.route("/:id")
  .get(getOneQuestionType)
  .put(updateOneQuestionType)
  .delete(deleteOneQuestionType);

module.exports = Routes;
