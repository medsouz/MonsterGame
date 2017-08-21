// takes what we need from the express library and imports into this page
import {Router} from "express";
var router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	let theUser = {
		username: "chris",
		coins: 100
	};

	let theInventory = [
		{
			gridSpace: 5,
			userGrid: 3,
			locationY: 1,
			locationX: 1,
			userMonster: 135,
			gridSpaceType: 3
		}
	];

	if ( theUser != null) {
		res.render("index", { user : theUser, inventory: theInventory });
	} else { res.redirect("login"); }
});

// login page
router.get("/login", function(req, res, next) {
	res.render("login");
});

// sign up page
router.get("/signup", function(req, res, next) {
	res.render("signup");
});

module.exports = router;
