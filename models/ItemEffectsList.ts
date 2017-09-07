import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class ItemEffectsList extends Model<ItemEffectsList> {
	@Column({primaryKey: true})
	public ItemEffectsListID: number;
	@Column
	public ItemID: number;
	@Column
	public ItemEffectID: number;
}
