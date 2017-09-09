import {Table, Column, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import Item from "./Item";
import User from "./User";

@Table
export default class ItemInventory extends Model<ItemInventory> {

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
