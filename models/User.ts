import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class User extends Model<User> {
	@Column({primaryKey: true})
	public UserID: number;
	@Column
	public UserName: string;
	@Column
	public Password: string;
	@Column
	public AccountType: eAccountType;
}

export enum eAccountType {
	User,
	Admin
}
