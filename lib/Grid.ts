import GridSpace from "./GridSpace";

export default class Grid {
	private GridSpaces: GridSpace[];
	// grid sizes exist in database for option to later "sell" larger monster grids for premium subscribers
	// this is stored in database under UserGrid as SizeX and SizeY linked to by UserID
	private GridSizeX: number;
	private GridSizeY: number;

	constructor() {
		this.GridSizeX = 4;
		this.GridSizeY = 3;
	}

	public createGridFromDB(userID: number) {

		let grid: GridSpace[] = [
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
			new GridSpace(),
		];

		// for X * Y, create grid space array with blank grid spaces
		// get LocationX from db GridSpace where userMonsterID = userMonsterID
		// and call updateMonsterFromDB for each grid space.
		let gridCount: number = this.GridSizeX * this.GridSizeY;

		// TODO: update this with db pull
		for (var i = 0; i < 12; i++) {
			grid[i] = this.fakeGridDB(0, i);
		}
		this.GridSpaces = grid;
	}

	public getGridSpace(spaceID: number) {
		return this.GridSpaces[spaceID];
	}

	public setGridSpace() {
		return null;
	}

	public getGridSpaces() {
		return this.GridSpaces;
	}

	public getGridSizeX() {
		return null;
	}

	public getGridSizeY() {
		return null;
	}

	public setGridSizeX() {
		return null;
	}

	public setGridSizeY() {
		return null;
	}

	public getGridSpaceList() {
		return null;
	}

	public clearGridSpaceList() {
		return null;
	}

	private  fakeGridDB(userID: number, userMonsterID: number) {

		let fakeDB: GridSpace[] = [
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
			new GridSpace(),
		];

		for (var i = 0; i < 12; i++) {
			fakeDB[i].updateMonsterFromDB(0, i);
		}

		return fakeDB[userMonsterID];
	}

}
