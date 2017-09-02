// takes what we need from the express library and imports into this page
import {Router} from "express";
var router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
	}

	// create monster game object
	// call monster game object function to load a grid with monsters,
	// and a list of items for the logged in user.

	// then call monster game function to output array for theMonsters
	// then call monster game function to output array for items.

	let theMonsters = [
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "chris"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "matt"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "hazard"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "aoeaoe"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "chris"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "matt"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "hazard"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "aoeaoe"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "chris"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "matt"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "hazard"
		},
		{
			MonsterID: getRandomInt(0, 3),
			MonsterDefaultName: "aoeaoe"
		}
	];

	if ( req.user != null ) {
		res.render("index", { user : req.user, monsters: theMonsters, messages: req.flash("error") });
	} else { res.redirect("auth/login"); }
});

module.exports = router;
