import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class Users extends Model<Users> {
	@Column
	public UserID: number;
  @Column
  public UserName: string;
  @Column
  public Password: string;
}
