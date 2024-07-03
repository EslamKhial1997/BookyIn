const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/UserSchema");

exports.createFirstManegerAccount = async () => {
  if (await UserModel.findOne({ email: "admin@gmail.com" })) return;
  const manager = await UserModel.create({
    name: "admin",
    email: "admin@gmail.com",

    password: "admin12345",
  });
  console.log(manager + "Admin account created successfully");
};

exports.Login = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (!user || req.body.password !== user.password) {
    res.status(500).json({
      status: "Error",
      massage: "Incorrect password Or Email",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
    expiresIn: "9000d",
  });
  res.status(200).json({ data: user, token });
}); 
exports.allowedTo = (...roles) =>
  expressAsyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          status: "Error",
          massage: "You are not allowed to access this route",
        })
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
    next(
      res.status(200).json({
        statusCode: "Error",
        message: "Invalid token Please Login Again",
        status: 401,
      })
    );
  }

  const verify = jwt.verify(token, process.env.DB_URL);
  const currentUser = await UserModel.findById(verify.userId);
  if (!currentUser) {
    next(
      res.status(200).json({
        statusCode: "Error",
        message: "User Not Found",
        status: 401,
      })
    );
  }
  if (!verify) {
    next(
      res.status(200).json({
        statusCode: "Error",
        message: "Invalid token Please Login Again",
        status: 401,
      })
    );
  }

  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > jwt.decode.iat) {
      return next(
        res.status(200).json({
          statusCode: "Error",
          message: "User recently changed his password. please login again..",
          status: 401,
        })
      );
    }
  }
  req.user = currentUser;

  next();
});
