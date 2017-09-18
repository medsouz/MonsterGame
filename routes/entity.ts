import {Router} from "express";
import Entity from "../models/Entity";
import EntityType from "../models/EntityType";
import EntityStateType from "../models/EntityStateType";
import EntityStateValue from "../models/EntityStateValue";
import ActiveItem from "../models/ActiveItem";
import ItemInventory from "../models/ItemInventory";
import Item from "../models/Item";
import ItemSlot from "../models/ItemSlot";
import ItemEffect from "../models/ItemEffect";

let router = Router();

// check for logged in user
router.use(function(req, res, next) {
	if (req.user)
		next();
	else
		res.redirect("/");
});

// load entity based on id and update based on state changes
router.get("/:id", function(req, res, next) {
	Entity.findByIdAndUpdate(req.params.id).then(function(result) {
		if (result.entity) {
			ItemInventory.findAll({where: {UserId: req.user.id, Count: {$gt: 0}}, include: [{model: Item, include: [ItemSlot, {model: ItemEffect, include: [EntityStateType]}]}]}).then(function(itemInventory: ItemInventory[]) {
				res.render("entity", { entity: result.entity, updated: result.updated, inventory: itemInventory, user: req.user });
			});
		} else {
			res.redirect("/");
		}
	});
});

// allow user to "interact" with entity on a time basis, prevent if not enough time has passed
router.get("/:id/interact", function(req, res, next) {
	Entity.findByIdAndUpdate(req.params.id).then(function(result) {
		if (result.entity && (60000 - (Date.now() - result.entity.LastInteract.getTime()) < 0)) {
			EntityStateValue.findOne({where: {EntityId: result.entity.id, EntityStateTypeId: 1}, include: [EntityStateType]}).then(function(entityStateValue: EntityStateValue) {
				var newValue = entityStateValue.Value + 10;
				if (newValue > entityStateValue.EntityStateType.MaxValue)
					newValue = entityStateValue.EntityStateType.MaxValue;
				if (newValue < entityStateValue.EntityStateType.MinValue)
					newValue = entityStateValue.EntityStateType.MinValue;

				result.entity.update({LastInteract: Date.now()}).then(function() {
					if (newValue !== entityStateValue.Value)
						entityStateValue.update({Value: newValue}).then(function() {
							res.redirect("/entity/" + req.params.id);
						});
					else
						res.redirect("/entity/" + req.params.id);
				});
			});
		} else {
			res.redirect("/");
		}
	});
});

// apply state changes to entity based on item effects and entity states related to item effects
router.get("/:id/item/give/:itemID", function(req, res, next) {
	Entity.findOne({where: {id: req.params.id, UserId: req.user.id}}).then(function(result: Entity) {
		if (result) {
			ItemInventory.findOne({where: {UserId: req.user.id, ItemId: req.params.itemID}}).then(function(inventory: ItemInventory) {
				if (inventory && inventory.Count > 0) {
					inventory.update({Count: inventory.Count - 1}).then(function() {
						ActiveItem.create({EntityId: result.id, Started: Date.now(), LastUpdated: Date.now(), ItemId: req.params.itemID}).then(function() {
							res.redirect("/entity/" + req.params.id);
						});
					});
				} else {
					console.log("Invalid Item!");
					res.redirect("/");
				}
			});
		} else {
			console.log("Invalid Entity!");
			res.redirect("/");
		}
	});
});

// remove active item from entity to stop effects before time out
router.get("/:id/item/remove/:activeItemID", function(req, res, next) {
	Entity.findOne({where: {id: req.params.id, UserId: req.user.id}}).then(function(result: Entity) {
		if (result) {
			ActiveItem.destroy({where: {id: req.params.activeItemID, entityId: result.id}}).then(function() {
				res.redirect("/entity/" + req.params.id);
			});
		} else {
			console.log("Invalid Entity!");
			res.redirect("/");
		}
	});
});

module.exports = router;
