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
	var dbClass;
	switch (req.params.type) {
		case "user":
			dbClass = User;
			break;
		case "item":
			dbClass = Item;
			break;
		case "monster":
			dbClass = MonsterType;
			break;
		default:
			res.redirect("/admin");
			return;
	}

	dbClass.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(result){
		if (result != null)
			res.render("admin/form", { user : req.user, type: req.params.type, data: result });
		else
			res.redirect("/admin");
	});
});

module.exports = router;
