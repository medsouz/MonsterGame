import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class UserMonsterStatesList extends Model<UserMonsterStatesList> {
	@Column({primaryKey: true})
	public UserMonsterStatesListID: number;
	@Column
	public UserMonsterID: number;
	@Column
	public MonsterStateID: number;
	@Column
	public Value: number;

}
