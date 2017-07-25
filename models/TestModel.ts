import {Table, Column, Model, HasMany} from "sequelize-typescript";

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
