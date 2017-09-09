import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import Item from "./Item";

@Table
export default class ActiveItem extends Model<ActiveItem> {

	@Column({primaryKey: true})
	public ActiveItemId: number;
	@Column
	public StartTime: Date;
	@Column
	public EndTime: string;

	@ForeignKey(() => Item)
	@Column
	public ItemId: number;
	@BelongsTo(() => Item)
	public Item: Item;

}
