// typescript commands to import
// express and its dependencies

// express is a web framework which adds http server functionality to node
// as well as middleware support (like view engines such as jade or ejs)
import * as express from "express";
import {Request, Response} from "express";

// parses the data from forms and turns it into json through serialization
import * as bodyParser from "body-parser";
// takes relevant client cookies and serializes them so that the data in them can be accessed using json
// also facilitates and simplifies sending cookies back to the client
import * as cookieParser from "cookie-parser";
// logging framework for console and log message generation
import * as logger from "morgan";
// file system paths - standard node library
import * as path from "path";

// sql object relation mapping:
// lets us make object models that link directly to the database
// and generates the database tables off of the objects created.
import {Sequelize} from "sequelize-typescript";

// defines the database, and creates if it doesn't already exist
const sequelize =  new Sequelize({
	name: "monstergame_db",
	dialect: "sqlite",
	username: "root",
	password: "",
	storage: __dirname + "monstergame.db",
	modelPaths: [__dirname + "/models"]
});

// applies configuration
sequelize.sync();

// initializes express server object
var app = express();

// view engine setup
// specifies the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));

app.use(logger("dev"));
// if page has forms filled in, turns info into json
// which is sent to page routing as req object called body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// if page has relevant cookies, takes cookie data in a json variable
// which is sent to page routing as req object called cookies
app.use(cookieParser());
// if a file is in the public folder ont he server, serves the file
// instead of using page routing
app.use(express.static(path.join(__dirname, "public")));

// test command to log full contents of req object to server log
// TODO: delete me
app.use(function(req, res, next) {
	console.log (req);
	next();
});

// includes routing files to better organize page routing
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

// returns the app object so that only what's in there can be accessed without
// all the other stuff on this page
module.exports = app;
