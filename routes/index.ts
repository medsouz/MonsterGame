// takes what we need from the express library and imports into this page
import {Router} from "express";
var router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	let theMonsters = [
		{
			MonsterID: 1,
			MonsterDefaultName: "chris"
		},
		{
			MonsterID: 2,
			MonsterDefaultName: "matt"
		},
		{
			MonsterID: 3,
			MonsterDefaultName: "hazard"
		},
		{
			MonsterID: 4,
			MonsterDefaultName: "aoeaoe"
		},
		{
			MonsterID: 1,
			MonsterDefaultName: "chris"
		},
		{
			MonsterID: 2,
			MonsterDefaultName: "matt"
		},
		{
			MonsterID: 3,
			MonsterDefaultName: "hazard"
		},
		{
			MonsterID: 4,
			MonsterDefaultName: "aoeaoe"
		},
		{
			MonsterID: 1,
			MonsterDefaultName: "chris"
		},
		{
			MonsterID: 2,
			MonsterDefaultName: "matt"
		},
		{
			MonsterID: 3,
			MonsterDefaultName: "hazard"
		},
		{
			MonsterID: 4,
			MonsterDefaultName: "aoeaoe"
		}
	];

	if ( req.user != null ) {
		res.render("index", { user : req.user, monsters: theMonsters, messages: req.flash });
	} else { res.redirect("auth/login"); }
});

module.exports = router;
