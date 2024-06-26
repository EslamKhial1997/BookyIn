const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const createUsersModel = require("../Models/createUsers");
const ApiError = require("../Resuble/ApiError");

exports.createFirstAdminAccount = expressAsyncHandler(async () => {
  const user = createUsersModel.findOne({ username: "admin" });
  if (!user) {
    await createUsersModel.create({
      name: "admin",
      email: "admin@gmail.com",
      phoneNumber: "01000000000",

      role: "admin",

      password: await bcrypt.hash("123456789", 12),
      confirmPassword: await bcrypt.hash("123456789", 12),
    });
  }

  console.log("Admin account created successfully");
});

exports.Login = expressAsyncHandler(async (req, res, next) => {
  const user = await createUsersModel.findOne({
    email: req.body.email,
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("InCorrect password Or Email"));
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "90d",
  });
  res.status(200).json({ data: user, token });
});
exports.allowedTo = (...roles) =>
  expressAsyncHandler(async (req, res, next) => {
    console.log(req.user.role);
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    next(new ApiError("Invalid authorization please login", 401));
  }

  const verify = jwt.verify(token, process.env.SECRET_KEY);
  const currentUser = await createUsersModel.findById(verify.userId);
  if (!currentUser) {
    next(new ApiError("User Not exist", 401));
  }

  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > jwt.decode.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again..",
          401
        )
      );
    }
  }
  req.user = currentUser;

  next();
});

exports.restNewPassword = (UserPassword) =>
  expressAsyncHandler(async (req, res, next) => {
    const user = await createUsersModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(
        new ApiError(`There is no user with email ${req.body.email}`, 404)
      );
    }
    console.log(user);

    user.password =await bcrypt.hash(req.body.restNewPassword, 12) ;

    await user.save();

    res.status(200).json({ status: "success", data: user });
  });
