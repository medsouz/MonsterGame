import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class UserItems extends Model<UserItems> {
	@Column({primaryKey: true})
	public UserItemID: number;
	@Column
	public ItemID: number;
	@Column
	public UserID: number;
	@Column
	public ItemCount: number;
}
