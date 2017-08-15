// sequelize-typescript wraps sequalize with typescript annotations
// lets us take typescript objects into SQL
import {Table, Column, Model, HasMany} from "sequelize-typescript";

// define the table rows and columns in sequelize, which then creates the database if it doesn't already exist.
@Table
export default class TestModel extends Model<TestModel> {
	@Column
	public name: string;
	@Column
	public birthday: Date;

	constructor() {
		super();
	}

	public stub() {
		return null;
	}
}
