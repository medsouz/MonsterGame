import Monster from "./Monster";

export default class GridSpace {
	private Monster: Monster;
	private GridSpaceTypes: number[];
	private GridLocation: number;

	// GridSpace as an object exists to allow us to add future functionality for
	// grid space types, which will have an impact on monster stats when combined with some monster states.
	// this is stored in database as GridSpaceType and a linking table with GridSpaceTypeEffects linked by GridSpaceID

	constructor() {
		this.Monster = new Monster();
		this.GridLocation = -1;
	}

	public updateMonsterFromDB(userID: number, userMonsterID: number) {
		this.setMonster(this.Monster.createMonsterFromDB(userID, userMonsterID));
	}

	public getMonster() {
		return this.Monster;
	}

	public setMonster(monster: Monster) {
		this.Monster = monster;
	}

	public getGridSpaceTypes() {
		return null;
	}

	public setGridSpaceTypes() {
		return null;
	}

	public getGridLocation() {
		return this.Monster;
	}

	public setGridLocation(location: number) {
		this.GridLocation = location;
	}

}
