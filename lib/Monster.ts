import MonsterState from "./MonsterState";
import Item from "./Item";
import Monsters from "../models/Monsters";
import UserMonsters from "../models/UserMonsters";
import MonsterStates from "../models/MonsterStates";
import UserMonsterStatesList from "../models/UserMonsterStatesList";

export default class Monster {

	private MonsterID: number;
	private UserMonsterID: number;
	private UserMonsterName: string;
	private MonsterDefaultName: string;
	// 0 "Happiness" 1 "Hunger" 2 "Intelligence" 3 "Strength"
	private MonsterStates: MonsterState[];
	private IsEgg: boolean;
	private MonsterPictureId: string;

	constructor() {
		this.MonsterID = -1;
		this.UserMonsterID = -1;
		this.UserMonsterName = "NON INITIALIZED OBJECT";
		this.MonsterDefaultName = "NON INITIALIZED OBJECT";
		this.IsEgg = true;
		this.MonsterPictureId = "NON INITIALIZED OBJECT";
	}

	public createMonsterFromDB(userID: number, userMonsterID: number) {

		var monster1: Monster;
		// get MonsterID, MonsterUserName, and isEgg from DB UserMonsters where UserMonsterID = userMonsterID
		// get MonsterDefaultName from DB Monsters where MonsterID = MonsterID
		// get MonsterTypeID (which we'll use as pictureId ) from DB MonsterTypeList where MonsterID = MonsterID
		// get MonsterStateID and value from DB UserMonsterStatesList
		// --- may be useful for now to do this in 4 batches
		// --- --- get value where MonsterStateID = 0, 1, 2, 3 etc and load manually into hunger/int/str etc.
		// --- --- later we can do some sort of check against state name.

		// fake DB uses 0 for userID and 0-12 for monsterID as fakeDB[i]
		monster1 = this.fakeMonsterDB(userID, userMonsterID);

		return monster1;
	}

	public getMonsterFromDB(userMonsterID: number) {

	  	let monster1: Monster = new Monster();

		UserMonsters.findOne({ where: {UserMonsterID: userMonsterID}, attributes: [
			"UserMonsterID", "MonsterID", "UserMonsterName", "isEgg"]
	 	}).then(function(monsterModel: UserMonsters) {
			if (monsterModel != null) {
  				monster1.setUserMonsterID(monsterModel.UserMonsterID);
				monster1.setUserMonsterName(monsterModel.UserMonsterName);
				monster1.setMonsterID(monsterModel.MonsterID);
				monster1.setIsEgg(monsterModel.isEgg);
				console.log("point1 " + monsterModel.MonsterID);
				console.log(monster1);
			} else {
				console.log("UserMonster " + userMonsterID + " not found in database");
				console.log(monster1);
			}
		});

		Monsters.findOne({ where: {MonsterID: monster1.getMonsterID()}, attributes: [
			"MonsterID", "MonsterDefaultName", "MonsterPictureId"]
		}).then(function(monsterModel: Monsters) {

			if (monsterModel != null) {
				monster1.setMonsterDefaultName(monsterModel.MonsterDefaultName);
				monster1.setMonsterPictureId(monsterModel.MonsterPictureId);
				console.log("point2");
			} else {
				console.log("Monster " + monster1.getMonsterID() + " not found in database");
				console.log(monster1);
			}
		});

		UserMonsterStatesList.findAll({ where: {UserMonsterID: userMonsterID}, attributes: [
			"MonsterStateID", "Value"]
		}).then(function(monsterModel: UserMonsterStatesList[]) {
			if (monsterModel != null) {
				var stateNames: string[];
				var states: MonsterState[] = new Array();
				for (let i of monsterModel) {
					var modelState: MonsterState = new MonsterState(i.MonsterStateID, i.Value);
					states.push(modelState);
				}
				monster1.setMonsterStates(states);
				console.log("point3");
				console.log(monster1);
			} else {
				console.log("MonsterStates for " + userMonsterID + " not found in database");
				console.log(monster1);
			}
		});

		console.log("point4");

	}

	// public getGrid(userID: number) {
	// 	GridSpaceModel.findAll({
	// 		where: {
	// 			UserID: userID
	// 		}
	// 	}).then(function(gridSpaceModel){
	// 		console.log(gridSpaceModel);
	// 	});
	// }

	public useItem(item: Item, state: number) {

		var monsterState: MonsterState = this.MonsterStates[state];
		var oldValue: number = monsterState.getMonterStateValue();
		monsterState.setMosterStateValue(oldValue + item.getItemValue());
		this.MonsterStates[state] = monsterState;

		// TODO: update this value in db
	}

	public clickMonster() {
		// TODO: clicking monster should update happiness in DB
		console.log("clicked Monster!");
	}

	public getMonsterID() {
		return this.MonsterID;
	}

	public setMonsterID(id: number) {
		this.MonsterID = id;
	}

	public getUserMonsterID() {
		return this.UserMonsterID;
	}

	public setUserMonsterID(id: number) {
		this.UserMonsterID = id;
	}

	public getUserMonsterName() {
		return this.UserMonsterName;
	}

	public setUserMonsterName(name: string) {
		this.UserMonsterName = name;
	}

	public getMonsterDefaultName() {
		return this.MonsterDefaultName;
	}

	public setMonsterDefaultName(name: string) {
		this.MonsterDefaultName = name;
	}

	public getMonsterStates() {
		return this.MonsterStates;
	}

	public addMonsterState() {
		// Placeholder for later ability to add temporary monster states
		return null;
	}

	public setMonsterStates(monsterStates: MonsterState[]) {
		this.MonsterStates = monsterStates;
	}

	public getIsEgg() {
			return this.IsEgg;
	}

	public setIsEgg(egg: boolean) {
			this.IsEgg = egg;
	}
	// this may be easier to divide to the pic id 0-19 then an evolve state A-C
	// then you combine them for id(1) + evolveState(B) = 1B.png
	public setMonsterPictureId(id: string) {
		this.MonsterPictureId = id;
	}

	public getMonsterPictureId() {
		return this.MonsterPictureId;
	}

	private  fakeMonsterDB(userID: number, userMonsterID: number) {

		let fakeDB: Monster[] = [
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
			new Monster(),
		];

		for (var i = 0; i < 12; i++) {
			fakeDB[i].setMonsterID(i);
			fakeDB[i].setUserMonsterID(i);
			fakeDB[i].setUserMonsterName("monster" + i);
			fakeDB[i].setMonsterDefaultName("defaultName" + i);
			fakeDB[i].setMonsterStates([new MonsterState(0, 50), new MonsterState(1, 40), new MonsterState(2, 30), new MonsterState(3, 50)]);
			fakeDB[i].setIsEgg(false);
			fakeDB[i].setMonsterPictureId(i + "A");
		}

		return fakeDB[userMonsterID];
	}

}
