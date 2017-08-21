import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export class User extends Model<User> {
	@Column({primaryKey: true})
	public UserID: number;
	@Column
	public UserName: string;
	@Column
	public Password: string;
}
