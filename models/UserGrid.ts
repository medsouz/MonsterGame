import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class UserGrid extends Model<UserGrid> {
	@Column
	public UserGridID: number;
	@Column
	public UserID: number;
  @Column
  public SizeX: number;
  @Column
  public SizeY: number;
}
