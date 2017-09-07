import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class GridSpaceType extends Model<GridSpaceType> {
	@Column({primaryKey: true})
	public GridSpaceTypeID: number;
	@Column
	public GridSpaceTypeEffectID: number;
	@Column
	public GridSpaceTypeDescription: string;

}
