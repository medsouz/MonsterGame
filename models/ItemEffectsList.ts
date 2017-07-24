import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class ItemEffectsList extends Model<ItemEffectsList> {
	@Column
	public ItemEffectsListID: number;
	@Column
	public ItemID: number;
	@Column
	public ItemEffectID: number;
}
