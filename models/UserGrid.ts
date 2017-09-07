import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class UserGrid extends Model<UserGrid> {
	@Column({primaryKey: true})
	public UserGridID: number;
	@Column
	public UserID: number;
	@Column
	public SizeX: number;
	@Column
	public SizeY: number;

}
