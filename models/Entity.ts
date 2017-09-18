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
		return Entity.findOne({where: {id: entityId}, include: Entity.getQueryInclude()}).then(function(e: Entity) {
			return e.updateValues().then(function(values) {
				// HACK: Reload the entity to show the updated values. Need to optimize
				return Entity.findOne({where: {id: entityId}, include: Entity.getQueryInclude()}).then(function(eUpdated: Entity) {
					return {entity: eUpdated, updated: values};
				});
			});
		});
	}

	public static findAllByUserId(userId: number) {
		return Entity.findAll({where: {UserId: userId}, include: Entity.getQueryInclude()}).then(function(entities: Entity[]) {
			return entities;
		});
	}

	public static getQueryInclude() {
		return [
			EntityType,
			{model: EntityStateValue, include: [EntityStateType]},
			{model: ActiveItem, include: [{model: Item, include: [{model: ItemEffect, include: [EntityStateType]}, ItemSlot]}]}
		];
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
		var update = function(ActiveItems: ActiveItem[], EntityStateValues: EntityStateValue[]) {
			var updates: any = {};
			return Promise.each(ActiveItems, function(activeItem) {
				var now = Date.now();
				var ends = activeItem.Item.ItemEffect.Duration + activeItem.Started.getTime();
				if (now > ends)
					now = ends;
				var lastUpdate = now - activeItem.LastUpdated.getTime();
				var timesApplied = Math.floor(lastUpdate / activeItem.Item.ItemEffect.Interval);
				var modified = timesApplied * activeItem.Item.ItemEffect.Offset;
				var nowClean = activeItem.LastUpdated.getTime() + activeItem.Item.ItemEffect.Interval * timesApplied;
				console.log(activeItem.Item.Name + " in " + activeItem.Item.ItemSlot.Name + " has effect: " + activeItem.Item.ItemEffect.EffectName + " | Time Since Last Update: " + lastUpdate + ", applied " + timesApplied + " times" + " Last Update: " + nowClean + " (Real: " + now + ") | Dead: " + (nowClean >= ends));
				updates[activeItem.Item.ItemEffect.EntityStateTypeId] = modified;

				var action: Promise<any>;
				if (nowClean >= ends)
					action = activeItem.destroy();
				else
					action = activeItem.update({LastUpdated: nowClean});

				var wrap = function(act: Promise<any>, actItem: ActiveItem, mod: number) {
					return action.then(function() {
						for (var e in EntityStateValues) {
							if (EntityStateValues[e].EntityStateTypeId === actItem.Item.ItemEffect.EntityStateTypeId) {
								var newValue = EntityStateValues[e].Value + mod;
								if (newValue > actItem.Item.ItemEffect.EntityStateType.MaxValue)
									newValue = actItem.Item.ItemEffect.EntityStateType.MaxValue;
								if (newValue < actItem.Item.ItemEffect.EntityStateType.MinValue)
									newValue = actItem.Item.ItemEffect.EntityStateType.MinValue;
								return EntityStateValues[e].update({Value: newValue}).then(function() {
									return; // It is expecting an undefined return
								});
							}
						}
					});
				};
				return wrap(action, activeItem, modified);
			}).then(function() {
				return updates;
			});
		};
		return update(this.ActiveItems, this.EntityStateValues);
	}

	public toString = (): string => {
		return this.Name;
	}
}
