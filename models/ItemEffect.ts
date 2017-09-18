import {Table, Column, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import EntityStateType from "./EntityStateType";
import Item from "./Item";

@Table
export default class ItemEffect extends Model<ItemEffect> {

	// item effects, to connect items to entity states and define how much they change states

	@Column
	public EffectName: string;
	@Column
	public Duration: number;
	@Column
	public Interval: number;
	@Column
	public Offset: number;
	@Column
	public Flag: string;

	@ForeignKey(() => EntityStateType)
	@Column
	public EntityStateTypeId: number;
	@BelongsTo(() => EntityStateType)
	public EntityStateType: EntityStateType;

	public toString = (): string => {
		return this.EffectName;
	}
}
