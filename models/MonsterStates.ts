import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class MonsterStates extends Model<MonsterStates> {
	@Column({primaryKey: true})
	public MonsterStateID: number;
	@Column
	public MonsterID: number;
	@Column
	public MonsterStateName: string;
	@Column
	public MonsterStateMaxValue: number;
	@Column
	public MonsterStateMinValue: number;

}
