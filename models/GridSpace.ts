import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class GridSpace extends Model<GridSpace> {
	@Column
	public GridSpaceID: number;
  @Column
  public UserGridID: number;
  @Column
  public LocationX: number;
  @Column
  public LocationY: number;
  @Column
  public UserMonsterID: number;
  @Column
  public GridSpaceTypeID: number;
}
