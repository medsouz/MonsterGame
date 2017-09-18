import {Table, Column, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import EntityStateType from "./EntityStateType";
import Entity from "./Entity";

@Table
export default class EntityStateValue extends Model<EntityStateValue> {

	// model to hold values for entity states per entity

	@Column
	public Value: number;
	@Column
	public LastDecay: Date;

	@ForeignKey(() => Entity)
	@Column
	public EntityId: number;

	@ForeignKey(() => EntityStateType)
	@Column
	public EntityStateTypeId: number;
	@BelongsTo(() => EntityStateType)
	public EntityStateType: EntityStateType;
}
