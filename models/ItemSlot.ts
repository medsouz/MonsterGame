import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class ItemSlot extends Model<ItemSlot> {

	@Column({primaryKey: true})
	public ItemSlotId: number;
	@Column
	public Name: string;
}
