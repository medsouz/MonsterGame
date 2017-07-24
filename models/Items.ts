import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class Items extends Model<Items> {
	@Column
	public ItemID: number;
	@Column
	public ItemName: string;
}
