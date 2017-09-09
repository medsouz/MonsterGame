import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import MonsterType from "./MonsterType";
import MonsterStateValue from "./MonsterStateValue";
import ActiveItem from "./ActiveItem";

@Table
export default class Monster extends Model<Monster> {

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

	@HasMany(() => MonsterStateValue)
	public MonsterStateValue: MonsterStateValue;

	@HasMany(() => ActiveItem)
	public ActiveItem: ActiveItem;
}
