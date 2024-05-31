const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbCollection = require("./Config/config");
const QuestionRoutes = require("./Routes/QuestionRoute");
const CategoryRoutes = require("./Routes/CategoryRoute");
const QuestionTypeRoutes = require("./Routes/QuestionTypeRoute");
const UserRoutes = require("./Routes/RoutesUsers");
const ApiError = require("./Resuble/ApiError");

app.use(express.json());
dotenv.config({ path: "config.env" });

dbCollection();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// MiddleWare
if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listen on the ${PORT}`);
});

app.use(express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/question", QuestionRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/questionType", QuestionTypeRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Sorry Can't find This url:${req.originalUrl}`, 400));
});

process.on("unhandledRejection", (err) => {
  console.log(`Server rejected ${err.name}`);
  server.close(() => {
    process.exit(1);
  });
});
