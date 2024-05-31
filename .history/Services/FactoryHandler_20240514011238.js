const expressAsyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
const ApiError = require("../Resuble/ApiError");
const APIFeatures = require("../utils/Feature");

exports.createOne = (Model) =>
  expressAsyncHandler(async (req, res) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12); 
    }
    if (req.body.passwordDB) {
      req.body.passwordDB = await bcrypt.hash(req.body.passwordDB, 12); 
    }
    const createDoc = await Model.create(req.body);
    res.status(201).json({ data: createDoc });
  });
exports.getAll = (Model, filterFunc = () => {}, enablePaginate = true) =>
  expressAsyncHandler(async (req, res, next) => {
    if (enablePaginate) {
      const apiFeatures = new APIFeatures(
        Model.find(filterFunc(req, res)),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const [docs, totalDocs] = await Promise.all([
        apiFeatures.query,
        apiFeatures.getTotalCount(),
      ]);
      const totalPages = Math.ceil(
        (totalDocs == 0 ? 1 : totalDocs) / (apiFeatures.queryParams.limit ?? 20)
      );

      res.status(200).json({
        isError: false,
        results: docs.length,
        status: "success",
        data: docs,
        pagination: {
          lastPage: totalPages,
          currentPage: apiFeatures.queryParams.page ?? 1,
        },
      });
    } else {
      const apiFeatures = new APIFeatures(
        Model.find(filterFunc(req, res)),
        req.query
      )
        .filter()
        .sort()
        .limitFields();
      const docs = await apiFeatures.query;

      res.status(200).json({
        isError: false,
        results: docs.length,
        status: "success",
        data: docs,
      });
    }
  });
exports.getOne = (Model, populateOpt) =>
  expressAsyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOpt) {
      query = query.populate(populateOpt);
    }
    const getDocById = await query;
    if (!getDocById)
      next(
        new ApiError(`Sorry Can't get This ID From ID :${req.params.id}`, 404)
      );
    res.status(200).json({ data: getDocById });
  });
exports.deleteOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    const deleteDoc = await Model.findByIdAndDelete(req.params.id);
    if (!deleteDoc) {
      return next(
        new ApiError(
          `Sorry Can't Delete This ID From ID :${req.params.id}`,
          404
        )
      );
    }
    // deleteDoc.remove();
    console.log(deleteDoc);
    res.status(200).json({ message: "Delete Success" });
  });
exports.updateOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const updateDocById = await Model.findByIdAndUpdate(
      req.params.id,
      req.body.image === "" ? { $set: { name: req.body.name } } : req.body,

      { new: true }
    );

    if (!updateDocById)
      next(
        new ApiError(
          `Sorry Can't Update This ID From ID :${req.params.id}`,
          404
        )
      );

    updateDocById.save();
    res.status(200).json({ data: updateDocById });
  });
