import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";
import EntityType from "./EntityType";
import EntityStateType from "./EntityStateType";
import EntityStateValue from "./EntityStateValue";
import ActiveItem from "./ActiveItem";
import Item from "./Item";
import ItemEffect from "./ItemEffect";
import ItemSlot from "./ItemSlot";
import ItemInventory from "./ItemInventory";
import * as Promise from "bluebird";

@Table
export default class Entity extends Model<Entity> {

	public static findByIdAndUpdate(entityId: number) {
		return Entity.findOne({where: {id: entityId}, include: [
			EntityType,
			{model: EntityStateValue, include: [EntityStateType]},
			{model: ActiveItem, include: [{model: Item, include: [ItemEffect, ItemSlot]}]}
		]}).then(function(entity: Entity) {
			return entity.updateValues().then(function() {
				return entity;
			});
		});
	}

	public static findAllByUserId(userId: number) {
		return Entity.findAll({where: {UserId: userId}, include: [
			EntityType,
			{model: EntityStateValue, include: [EntityStateType]},
			{model: ActiveItem, include: [{model: Item, include: [ItemEffect, ItemSlot]}]}
		]}).then(function(entities: Entity[]) {
			return entities;
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
	public ActiveItems: ActiveItem[];

	public updateValues(): Promise<any> {
		for (var i in this.ActiveItems) {
			console.log(this.ActiveItems[i].Item.Name + " in " + this.ActiveItems[i].Item.ItemSlot.Name);
		}
		return this.update({});
	}

	public toString = (): string => {
		return this.Name;
	}
}
