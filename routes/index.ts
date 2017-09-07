// takes what we need from the express library and imports into this page
import {Router} from "express";
import GridSpace from "../lib/GridSpace";
import Monster from "../lib/Monster";
import MonsterState from "../lib/MonsterState";
import MonsterGame from "../lib/MonsterGame";
let router = Router();

var monsterGame1 = new MonsterGame();

/* GET home page. */
router.get("/", function(req, res, next) {

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
	}
	// TODO: create monster game object
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

	let monsterDisplay = new Monster();

	monsterDisplay = monsterGame1.getGrid().getGridSpace(id).getMonster();

	// TODO: delete test below
	var monster1 = new Monster();
	monster1.getMonsterFromDB(11);

	res.render("monster", { theMonster: monsterDisplay} );
});

router.get("/gameGrid", function(req, res, next) {

	// var monsterGen: Monster = new Monster();
	// // todo make function to fill from db
	// let theMonsters: GridSpace[] = [
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace(),
	// 	new GridSpace()
	// ];
	//
	// for (var i = 0; i < 12; i++) {
	//
	// 	theMonsters[i].setMonster(monsterGen.createMonsterFromDB(0, i));
	// }

	var gameGrid = monsterGame1.getGrid();
	var theMonsters: GridSpace[] = gameGrid.getGridSpaces();

	res.render("gameGrid", { monsters: theMonsters });
});

router.get("/inventory", function(req, res, next) {

	// yup this happened
	let theInventory = [
		{
			name: "Antidote",
			amount: 100,
			picture: "antidote"
		},
		{
			name: "Awakening",
			amount: 100,
			picture: "awakening"
		},
		{
			name: "Burn-Heal",
			amount: 100,
			picture: "burn-heal"
		},
		{
			name: "Calcium",
			amount: 100,
			picture: "calcium"
		},
		{
			name: "Hyper-Potion",
			amount: 100,
			picture: "hyper-potion"
		},
		{
			name: "M-Berry",
			amount: 100,
			picture: "magost-berry"
		},
		{
			name: "Pineapple",
			amount: 100,
			picture: "pinap-berry"
		},
		{
			name: "Quick-Powder",
			amount: 100,
			picture: "quick-powder"
		}
	];

	res.render("inventory", { inventory: theInventory});
});

module.exports = router;
