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
  .post(allowTo, uploadImage,resizeImage,createQuestionOnCategory, QuestionValidation, createQuestionService)
  .get( allowTo, getAllQuestionService);
Routes.route("/:id")
  .get(allowTo, getQuestionByIdValidator,getOneQuestionService)
  .put(allowTo, uploadImage, resizeImage,updateQuestionValidation, updateQuestionService)
  .delete(allowTo, deleteQuestionByIdValidator, deleteQuestionService);

module.exports = Routes;
