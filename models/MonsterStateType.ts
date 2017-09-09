import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class MonsterStateType extends Model<MonsterStateType> {

	@Column({primaryKey: true})
	public MonsterStateTypeId: number;
	@Column
	public Name: string;
	@Column
	public MaxValue: number;
	@Column
	public MinValue: number;
}
