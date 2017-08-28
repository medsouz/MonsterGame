// takes that we need from the express library and imports into this page
import {Router} from "express";
import GridSpace from "../lib/GridSpace";
import Monster from "../lib/Monster";
let router = Router();

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

	let theMonsters: GridSpace[] = [
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace(),
		new GridSpace()
	];
	theMonsters[0].setMonster(new Monster("bubbles", "0A"));
	theMonsters[1].setMonster(new Monster("aoeaoe", "9A"));
	theMonsters[2].setMonster(new Monster("eaoeaoe", "0C"));
	theMonsters[3].setMonster(new Monster("eaoeaoe", "10A"));
	theMonsters[4].setMonster(new Monster("aoeaoeoaeaoe", "4A"));
	theMonsters[5].setMonster(new Monster("ohidhiudhuddi", "5A"));
	theMonsters[6].setMonster(new Monster("lnwmt", "16B"));
	theMonsters[7].setMonster(new Monster("kexeuieui", "17C"));
	theMonsters[8].setMonster(new Monster("thdtcgtcft", "5B"));
	theMonsters[9].setMonster(new Monster("gfrfcrgf", "4A"));
	theMonsters[10].setMonster(new Monster("oeuoeuoe", "3A"));
	theMonsters[11].setMonster(new Monster("fctgcgft", "7C"));

	if ( req.user != null ) {
		res.render("index", { user : req.user, monsters: theMonsters, messages: req.flash("error") });
	} else { res.redirect("auth/login"); }
});

module.exports = router;
