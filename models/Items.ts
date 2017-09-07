import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class Items extends Model<Items> {
	@Column({primaryKey: true})
	public ItemID: number;
	@Column
	public ItemName: string;
}
