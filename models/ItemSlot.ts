import {Table, Column, Model, HasMany} from "sequelize-typescript";
import ActiveItem from "./ActiveItem";
import Item from "./Item";
import * as Promise from "bluebird";

@Table
export default class ItemSlot extends Model<ItemSlot> {

	// model to determine which slots an item takes up on an entity
	// e.g. hands/feet.

	@Column
	public Name: string;

	public toString = (): string => {
		return this.Name;
	}

	public isOccupied(entityId: number): Promise<boolean> {
		var checkOccupied = function(eId: number, slotId: number) {
			return new Promise<boolean>(function(resolve) {
				return ActiveItem.findAll({where: {EntityId: entityId}, include: [Item]}).then(function(activeItems: ActiveItem[]) {
					for (var i in activeItems) {
						if (activeItems[i].Item.ItemSlotId === slotId) {
							resolve(true);
							return;
						}
					}
					resolve(false);
				});
			 });
	 	};
		return checkOccupied(entityId, this.id);
	}
}
