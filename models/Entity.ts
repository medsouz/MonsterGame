import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import EntityType from "./EntityType";
import EntityStateValue from "./EntityStateValue";
import ActiveItem from "./ActiveItem";

@Table
export default class Entity extends Model<Entity> {

	@Column
	public Name: string;

	@ForeignKey(() => User)
	@Column
	public UserId: number;
	@BelongsTo(() => User)
	public User: User;

	@ForeignKey(() => EntityType)
	@Column
	public EntityTypeId: number;
	@BelongsTo(() => EntityType)
	public EntityType: EntityType;

	@HasMany(() => EntityStateValue)
	public EntityStateValue: EntityStateValue;

	@HasMany(() => ActiveItem)
	public ActiveItem: ActiveItem;
}
