import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class GridSpaceTypeEffects extends Model<GridSpaceTypeEffects> {
	@Column
	public GridSpaceTypeEffectID: number;
	@Column
	public GridSpaceTypeEffectValue: number;
	@Column
	public GridSpaceTypeEffectDescription: string;
}
