import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class UserItems extends Model<UserItems> {
	@Column
	public UserItemID: number;
  @Column
  public ItemID: number;
  @Column
  public UserID: number;
}
