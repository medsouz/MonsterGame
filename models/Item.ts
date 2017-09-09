import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import ItemEffect from "./ItemEffect";
import ItemSlot from "./ItemSlot";

@Table
export default class Item extends Model<Item> {

	@Column({primaryKey: true})
	public ItemId: number;
	@Column
	public Name: string;
	@Column
	public PictureId: string;

	@HasMany(() => ItemEffect)
	public ItemEffect: ItemEffect;

	@ForeignKey(() => ItemSlot)
	@Column
	public ItemSlotId: number;
	@BelongsTo(() => ItemSlot)
	public ItemSlot: ItemSlot;

}
