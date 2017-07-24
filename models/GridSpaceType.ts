import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class GridSpaceType extends Model<GridSpaceType> {
	@Column
	public GridSpaceTypeID: number;
  @Column
  public GridSpaceTypeEffectID: number;
  @Column
  public GridSpaceTypeDescription: string;

}
