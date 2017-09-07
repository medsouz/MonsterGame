import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class ItemEffects extends Model<ItemEffects> {
	@Column({primaryKey: true})
	public ItemEffectsID: number;
	@Column
	public ItemValue: number;
	@Column
	public ItemDescription: string;
}
