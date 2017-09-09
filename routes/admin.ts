import {Router} from "express";
import User from "../models/User";
import {eAccountType} from "../models/User";
import MonsterType from "../models/MonsterType";
import Item from "../models/Item";
var router = Router();

// Only allow authenticated administrators onto admin pages
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

module.exports = router;
