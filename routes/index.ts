// takes what we need from the express library and imports into this page
import {Router} from "express";
var router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {
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

	if ( req.user != null ) {
		res.render("index", { user : req.user, inventory: theInventory });
	} else { res.redirect("auth/login"); }
});

module.exports = router;
