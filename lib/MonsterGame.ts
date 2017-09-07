import Grid from "./Grid";
import User from "./User";
import Item from "./Item";
import ActivityLog from "./ActivityLog";

export default class MonsterGame {

	private Grid: Grid;
	private User: User;
	private Items: Item[];
	private ActivityLog: ActivityLog;

	constructor() {
		// TODO: change this to pull from DB and implement User information

		// this.setUser(user);

		var grid1 = new Grid();
		grid1.createGridFromDB(0);
		this.setGrid(grid1);

		var items: Item[] = [
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item()
		];
		var counter1 = items.length;
		for (var i = 0; i < counter1; i++) {
			items[i].updateItemFromDB(0, i);

		}
	}

	// TODO: need function for if no user grid exists to create a new one with random monsters

	public getGrid() {
		return this.Grid;
	}

	public setGrid(grid: Grid) {
		this.Grid = grid;
	}

	public getUser() {
		return this.Grid;
	}

	public setUser(user: User) {
		this.User = user;
	}

	public getItems() {
		return null;
	}

	public setItems() {
		return null;
	}

	public getActivityLog() {
		return null;
	}

	public setActivityLog() {
		return null;
	}

}
