// takes that we need from the express library and imports into this page
import {Router} from "express";
import GridSpace from "../lib/GridSpace";
import Monster from "../lib/Monster";
import MonsterState from "../lib/MonsterState";
let router = Router();

function aoeaea(){

}

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

	if ( req.user != null ) {
		res.render("index", { user : req.user, messages: req.flash("error")});
	} else { res.redirect("auth/login"); }
});

router.get("/showMonster/:id", function(req, res, next) {
	// this will give out monster id to then get from db;
	let id = req.params.id;
	// todo monster game function.........to take user id.....and user monster id.....and return mosnter....
	let monster = new Monster("bubbles", "0A", [new MonsterState(0, "int", 50)], 0);
	res.render("monster", { theMonster: monster} );
});

router.get("/gameGrid", function(req, res, next) {

	// todo make function to fill from db
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
	theMonsters[0].setMonster(new Monster("bubbles", "0A", [new MonsterState(0, "int", 50)], 0));
	theMonsters[1].setMonster(new Monster("aoeaoe", "9A", [new MonsterState(0, "int", 50)], 1));
	theMonsters[2].setMonster(new Monster("eaoeaoe", "0C", [new MonsterState(0, "int", 50)], 2));
	theMonsters[3].setMonster(new Monster("eaoeaoe", "10A", [new MonsterState(0, "int", 50)], 3));
	theMonsters[4].setMonster(new Monster("aoeaoeoaeaoe", "4A", [new MonsterState(0, "int", 50)], 4));
	theMonsters[5].setMonster(new Monster("ohidhiudhuddi", "5A", [new MonsterState(0, "int", 50)], 5));
	theMonsters[6].setMonster(new Monster("lnwmt", "16B", [new MonsterState(0, "int", 50)], 6));
	theMonsters[7].setMonster(new Monster("kexeuieui", "17C", [new MonsterState(0, "int", 50)], 7));
	theMonsters[8].setMonster(new Monster("thdtcgtcft", "5B", [new MonsterState(0, "int", 50)], 8));
	theMonsters[9].setMonster(new Monster("gfrfcrgf", "4A", [new MonsterState(0, "int", 50)], 9));
	theMonsters[10].setMonster(new Monster("oeuoeuoe", "3A", [new MonsterState(0, "int", 50)], 10));
	theMonsters[11].setMonster(new Monster("fctgcgft", "7C", [new MonsterState(0, "int", 50)], 11));

	res.render("gameGrid", { monsters: theMonsters });
});

module.exports = router;
