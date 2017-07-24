import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class MonsterTypeList extends Model<MonsterTypeList> {
	@Column
	public MonsterTypeListID: number;
	@Column
	public MonsterID: number;
	@Column
	public MonsterTypeID: number;

}
