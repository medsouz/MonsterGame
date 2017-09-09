import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import Item from "./Item";
import User from "./User";

@Table
export default class ItemInventory extends Model<ItemInventory> {

	@Column({primaryKey: true})
	public ItemInventoryId: number;

	@ForeignKey(() => User)
	@Column
	public UserId: number;
	@BelongsTo(() => User)
	public User: User;

	@ForeignKey(() => Item)
	@Column
	public ItemId: number;
	@BelongsTo(() => Item)
	public Item: Item;

	@Column
	public Count: number;

}
