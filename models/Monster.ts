import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import MonsterType from "./MonsterType";
import MonsterStateValue from "./MonsterStateValue";
import ActiveItem from "./ActiveItem";

@Table
export default class Monster extends Model<Monster> {

	@Column({primaryKey: true})
	public MonsterId: number;
	@Column
	public Name: string;

	@ForeignKey(() => User)
	@Column
	public UserId: number;
	@BelongsTo(() => User)
	public User: User;

	@ForeignKey(() => MonsterType)
	@Column
	public MonsterTypeId: number;
	@BelongsTo(() => MonsterType)
	public MonsterType: MonsterType;

	@ForeignKey(() => MonsterStateValue)
	@Column
	public MonsterStateValueId: number;
	@HasMany(() => MonsterStateValue)
	public MonsterStateValue: MonsterStateValue;

	@ForeignKey(() => ActiveItem)
	@Column
	public ActiveItemId: number;
	@HasMany(() => ActiveItem)
	public ActiveItem: ActiveItem;

}
