import {Table, Column, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import MonsterStateType from "./MonsterStateType";
import Monster from "./Monster";

@Table
export default class MonsterStateValue extends Model<MonsterStateValue> {

	@Column
	public Value: number;

	@ForeignKey(() => Monster)
	@Column
	public MonsterId: number;

	@ForeignKey(() => MonsterStateType)
	@Column
	public MonsterStateTypeId: number;
	@BelongsTo(() => MonsterStateType)
	public MonsterStateType: MonsterStateType;

}
