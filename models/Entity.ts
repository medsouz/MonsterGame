import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import EntityType from "./EntityType";
import EntityStateType from "./EntityStateType";
import EntityStateValue from "./EntityStateValue";
import ActiveItem from "./ActiveItem";
import * as Promise from "bluebird";

@Table
export default class Entity extends Model<Entity> {

	public static findByIdAndUpdate(entityId: number) {
		return Entity.findOne({where: {id: entityId}, include: [EntityType, {model: EntityStateValue, include: [EntityStateType]}]}).then(function(entity: Entity) {
			return entity.updateValues().then(function() {
				return entity;
			});
		});
	}

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
	public EntityStateValues: EntityStateValue[];

	@HasMany(() => ActiveItem)
	public ActiveItem: ActiveItem;

	public updateValues(): Promise<any> {
		return new Promise(function(resolve) { resolve(); });
	}
}
