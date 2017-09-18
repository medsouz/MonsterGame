import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import ItemEffect from "./ItemEffect";
import ItemSlot from "./ItemSlot";

@Table
export default class Item extends Model<Item> {

	// model for holding items
	// picture id must match image name in images folder

	@Column
	public Name: string;
	@Column
	public PictureId: string;

	@ForeignKey(() => ItemEffect)
	@Column
	public ItemEffectId: number;
	@BelongsTo(() => ItemEffect)
	public ItemEffect: ItemEffect;

	@ForeignKey(() => ItemSlot)
	@Column
	public ItemSlotId: number;
	@BelongsTo(() => ItemSlot)
	public ItemSlot: ItemSlot;

	public toString = (): string => {
		return this.Name;
	}
}
