import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import MonsterStateType from "./MonsterStateType";

@Table
export default class MonsterStateValue extends Model<MonsterStateValue> {

	@Column({primaryKey: true})
	public MonsterStateValueId: number;
	@Column
	public Value: number;

	@ForeignKey(() => MonsterStateType)
	@Column
	public MonsterStateTypeId: number;
	@BelongsTo(() => MonsterStateType)
	public MonsterStateType: MonsterStateType;

}
