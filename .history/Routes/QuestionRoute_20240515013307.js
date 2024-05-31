const { Router } = require("express");

const {
  createQuestionService,
  getOneQuestionService,
  getAllQuestionService,
  createQuestionOnCategory,
  updateQuestionService,
  deleteQuestionService,
  uploadImage,
  resizeImage,
} = require("../Services/QuestionService");
const {
  QuestionValidation,
  deleteQuestionByIdValidator,
  getQuestionByIdValidator,
  updateQuestionValidation,
} = require("../Resuble/QuestionValidation");
const { allowedTo, protect } = require("../Services/AuthService");



const Routes = Router({ mergeParams: true });
Routes.use(allowedTo("admin"));
Routes.route("/")
  .post(protect uploadImage,resizeImage,createQuestionOnCategory, QuestionValidation, createQuestionService)
  .get( protect getAllQuestionService);
Routes.route("/:id")
  .get(protect getQuestionByIdValidator,getOneQuestionService)
  .put(protect uploadImage, resizeImage,updateQuestionValidation, updateQuestionService)
  .delete(protect deleteQuestionByIdValidator, deleteQuestionService);

module.exports = Routes;
