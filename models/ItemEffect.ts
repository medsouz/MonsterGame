import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import MonsterStateType from "./MonsterStateType";

@Table
export default class ItemEffect extends Model<ItemEffect> {

	@Column({primaryKey: true})
	public ItemEffectId: number;
	@Column
	public Duration: number;
	@Column
	public Offset: number;
	@Column
	public Flag: string;

	@ForeignKey(() => MonsterStateType)
	@Column
	public MonsterStateTypeId: number;
	@BelongsTo(() => MonsterStateType)
	public MonsterStateType: MonsterStateType;

}
