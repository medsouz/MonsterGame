import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class ItemEffects extends Model<ItemEffects> {
	@Column
	public ItemEffectsID: number;
  @Column
  public ItemValue: number;
  @Column
  public ItemDescription: string;
}
