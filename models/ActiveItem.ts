import {Table, Column, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import Item from "./Item";
import Entity from "./Entity";

@Table
export default class ActiveItem extends Model<ActiveItem> {

	@Column
	public Started: Date;
	@Column
	public LastUpdated: Date;

	@ForeignKey(() => Item)
	@Column
	public ItemId: number;
	@BelongsTo(() => Item)
	public Item: Item;

	@ForeignKey(() => Entity)
	@Column
	public EntityId: number;

	public getRemainingTime() {
		return (this.Started.getTime() + this.Item.ItemEffect.Duration) - Date.now();
	}
}
