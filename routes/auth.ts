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
	done(null, user.id);
});

passport.deserializeUser(function(userID, done) {
	User.findOne({
		where: {
			id: userID
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
		User.findOne({
			where: { UserName: name, Password: User.hashPassword(password) }
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
	if (req.user)
		res.redirect("/");
	else
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
	if (req.user)
		res.redirect("/");
	else
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
				User.findAll().then(function(users) {
					User.create({
						UserName: req.body.username,
						Password: User.hashPassword(req.body.password),
						AccountType: (users.length === 0) ? eAccountType.Admin : eAccountType.User // If there are no other users then make this user an admin
					}).then(function(newUser: User){
						req.flash("error", "Created new user!");
						res.redirect("/");
					});
				});
			}
		});
	} else {
		req.flash("error", "Invalid username or password");
		res.redirect("/auth/register");
	}
});

module.exports = router;
