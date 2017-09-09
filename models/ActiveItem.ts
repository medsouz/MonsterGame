import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import Item from "./Item";
import Monster from "./Monster";

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

	@ForeignKey(() => Monster)
	@Column
	public MonsterId: number;
}
