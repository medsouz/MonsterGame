import * as express from "express";
import {Request, Response} from "express";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";

import {Sequelize} from "sequelize-typescript";

const sequelize =  new Sequelize({
	name: "monstergame_db",
	dialect: "sqlite",
	username: "root",
	password: "",
	storage: __dirname + "monstergame.db",
	modelPaths: [__dirname + "/models"]
});

sequelize.sync();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err: any = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: any) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
