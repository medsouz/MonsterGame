import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class GridSpaceTypeEffects extends Model<GridSpaceTypeEffects> {
	@Column({primaryKey: true})
	public GridSpaceTypeEffectID: number;
	@Column
	public GridSpaceTypeEffectValue: number;
	@Column
	public GridSpaceTypeEffectDescription: string;
}
