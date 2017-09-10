import {Table, Column, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import Item from "./Item";
import Entity from "./Entity";

@Table
export default class ActiveItem extends Model<ActiveItem> {

	@Column
	public StartTime: Date;
	@Column
	public EndTime: string;

	@ForeignKey(() => Item)
	@Column
	public ItemId: number;
	@BelongsTo(() => Item)
	public Item: Item;

	@ForeignKey(() => Entity)
	@Column
	public EntityId: number;
}
