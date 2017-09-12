import {Table, Column, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import EntityStateType from "./EntityStateType";
import Item from "./Item";

@Table
export default class ItemEffect extends Model<ItemEffect> {

	@Column
	public EffectName: string;
	@Column
	public Duration: number;
	@Column
	public Offset: number;
	@Column
	public Flag: string;

	@ForeignKey(() => Item)
	@Column
	public ItemId: number;

	@ForeignKey(() => EntityStateType)
	@Column
	public EntityStateTypeId: number;
	@BelongsTo(() => EntityStateType)
	public EntityStateType: EntityStateType;

	public toString = (): string => {
		return this.EffectName;
	}
}
