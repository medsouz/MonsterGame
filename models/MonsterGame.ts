import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import Monster from "./Monster";
import Item from "./Item";

@Table
export default class MonsterGame extends Model<MonsterGame> {

	@Column({primaryKey: true})
	public MonsterGameId: number;

	@ForeignKey(() => User)
	@Column
	public UserId: number;
	@BelongsTo(() => User)
	public User: User;

	@ForeignKey(() => Monster)
	@Column
	public MonsterId: number;
	@BelongsTo(() => Monster)
	public Monster: Monster;

	@ForeignKey(() => Item)
	@Column
	public ItemId: number;
	@BelongsTo(() => Item)
	public Item: Item;

}
