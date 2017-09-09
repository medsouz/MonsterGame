import {Router} from "express";
import User from "../models/User";
import {eAccountType} from "../models/User";
import MonsterType from "../models/MonsterType";
import Item from "../models/Item";
var router = Router();

/* GET admin home page. */
router.get("/", function(req, res, next) {
	if (req.user && req.user.AccountType === eAccountType.Admin)
		User.findAll().then(function(users: User[]) {
			MonsterType.findAll().then(function(monsters: MonsterType[]) {
				Item.findAll().then(function(items: Item[]) {
					res.render("admin/admin", { user : req.user, userList: users, monsterList: monsters, itemList: items });
				});
			});
		});
	else
		res.redirect("/");
});

module.exports = router;
