import * as express from "express";
import {Request, Response} from "express";
import * as passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";

import User from "../models/User";
import {eAccountType} from "../models/User";
import {IFindOptions} from "sequelize-typescript";
import {Sequelize} from "sequelize-typescript";

let router = express.Router();
let UserModel = new User();

passport.serializeUser(function(user: User, done) {
	done(null, user.UserID);
});

passport.deserializeUser(function(userID, done) {
	User.findOne({
		where: {
			UserID: userID
		}
	}).then(function(user: User){
		if (user != null)
			done(null, user);
		else
			done("Invalid User ID", false);
	});
});

passport.use(new LocalStrategy(
	function(name, password, done) {
 		var key = require("crypto").pbkdf2Sync(password, "NaCL" /* TODO: Better salting */, 30000, 512, "sha512");

		User.findOne({
			where: { UserName: name, Password: key }
		}).then(function(user: User) {
			console.log(user);
			if (user != null) {
				done(null, user);
			} else {
				done(null, false, { message: "Invalid username or password." });
			}
		});
	}
));

/* GET login page. */
router.get("/login", function(req, res, next) {
	res.render("auth/login", { messages: req.flash("error") });
});

/* POST login page. */
router.post("/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/auth/login", failureFlash: true }));

/* GET logout page. */
router.get("/logout", function(req, res, next) {
	req.logout();
	res.redirect("/");
});

/* GET register page. */
router.get("/register", function(req, res, next) {
	res.render("auth/register", { messages: req.flash("error") });
});

/* POST register page. */
router.post("/register", function(req, res, next) {
	if (req.body.username.match("^[A-Za-z0-9_]{3,20}$") && req.body.password === req.body.confirmPassword) {
		User.findOne({
			where: { UserName: req.body.username }
		}).then(function(existingUser: User) {
			if (existingUser != null) {
				req.flash("error", "Username is already in use");
				res.redirect("/auth/register");
			} else {
				console.log("New user");
				var key = require("crypto").pbkdf2Sync(req.body.password, "NaCL" /* TODO: Better salting */, 30000, 512, "sha512");
				User.create({
					UserName: req.body.username,
					Password: key,
					AccountType: eAccountType.User
				}).then(function(newUser: User){
					req.flash("error", "Created new user!");
					res.redirect("/");
				});
			}
		});
	} else {
		req.flash("error", "Invalid username or password");
		res.redirect("/auth/register");
	}
});

module.exports = router;
