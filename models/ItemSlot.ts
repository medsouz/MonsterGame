import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class ItemSlot extends Model<ItemSlot> {

	@Column
	public Name: string;
}
