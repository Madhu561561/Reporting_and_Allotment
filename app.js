var express = require("express");
var path = require("path");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./config/db");// models
connectDB();
const passport = require("passport");//It uses a JWT-based authentication strategy to verify that requests are from authenticated users.
var indexRouter = require("./routes/index");
var postsRouter = require("./routes/posts");
var visitorsRouter = require("./routes/visitors");
var queriesRouter = require("./routes/queries");
var attendanceRouter = require("./routes/attendance");
var usersRouter = require("./routes/users");
var studataRouter = require("./routes/studata");
var roomRouter = require("./routes/room");
var allocationRouter = require("./routes/allocation");
var prevstudentsRouter = require("./routes/prevstudents");
var registerRouter = require("./routes/register");
var wardenRegisterRouter = require("./routes/wardenRegister");
const staffRegisterRoutes = require("./routes/StaffRegister");

require("dotenv").config();
var app = express();
// app.use(fileupload());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(passport.initialize());
require("./middlewares/passport")(passport);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "./public/"));
app.use(express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.resolve(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/api", postsRouter);
app.use("/api", visitorsRouter);
app.use("/api", queriesRouter);
app.use("/api", attendanceRouter);
app.use("/api", studataRouter);
app.use("/api", prevstudentsRouter);
app.use("/api", prevstudentsRouter);
app.use("/api", roomRouter);
app.use("/api", registerRouter);
app.use("/api", wardenRegisterRouter);
app.use("/api", staffRegisterRoutes);

module.exports = app;
