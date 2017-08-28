import Monster from "./Monster";

export default class GridSpace {
	private Monster: Monster;
	private GridSpaceTypes: number[];

	// GridSpace as an object exists to allow us to add future functionality for
	// grid space types, which will have an impact on monster stats when combined with some monster states.

	constructor() {
		console.log("");
	}

	public getMonster() {
		return null;
	}

	public setMonster() {
		return null;
	}

	public getGridSpaceTypes() {
		return null;
	}

	public setGridSpaceTypes() {
		return null;
	}

	public viewGridSpace() {
		return null;
	}

	public modifyGridSpace() {
		return null;
	}

	public clearMonster() {
		return null;
	}
}
