import {Router} from "express";
import User from "../models/User";
import {eAccountType} from "../models/User";
import MonsterType from "../models/MonsterType";
import Item from "../models/Item";
import * as path from "path";
import {Model} from "sequelize-typescript";
var router = Router();

// Only allow authenticated administrators onto admin panel
router.use(function(req, res, next) {
	if (req.user && req.user.AccountType === eAccountType.Admin)
		next();
	else
		res.redirect("/");
});

/* GET admin home page. */
router.get("/", function(req, res, next) {
		User.findAll().then(function(users: User[]) {
			MonsterType.findAll().then(function(monsters: MonsterType[]) {
				Item.findAll().then(function(items: Item[]) {
					res.render("admin/admin", { user : req.user, userList: users, monsterList: monsters, itemList: items });
				});
			});
		});
});

router.get("/new/:type", function(req, res, next) {
	console.log(req.params.type);
	switch (req.params.type) {
		case "user":
		case "item":
		case "monster":
			res.render("admin/form", { user : req.user, type: req.params.type });
			break;
		default:
			res.redirect("/admin");
			break;
	}
});

router.get("/edit/:type/:id", function(req, res, next) {
	// TODO: investigate removing duplicate code
	switch (req.params.type) {
		case "user":
			User.findOne({
				where: {
					id: req.params.id
				}
			}).then(function(user: User){
				if (user != null)
					res.render("admin/form", { user : req.user, type: req.params.type, data: user });
				else
					res.redirect("/admin");
			});
			break;
		case "item":
			Item.findOne({
				where: {
					id: req.params.id
				}
			}).then(function(item: Item){
				if (item != null)
					res.render("admin/form", { user : req.user, type: req.params.type, data: item });
				else
					res.redirect("/admin");
			});
			break;
		case "monster":
			MonsterType.findOne({
				where: {
					id: req.params.id
				}
			}).then(function(monsterType: MonsterType){
				if (monsterType != null)
					res.render("admin/edit", { user : req.user, type: req.params.type, data: monsterType });
				else
					res.redirect("/admin");
			});
			break;
		default:
			res.redirect("/admin");
			return;
	}
});

module.exports = router;
