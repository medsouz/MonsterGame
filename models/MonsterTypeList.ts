import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class MonsterTypeList extends Model<MonsterTypeList> {
	@Column({primaryKey: true})
	public MonsterTypeListID: number;
	@Column
	public MonsterID: number;
	@Column
	public MonsterTypeID: number;

}
