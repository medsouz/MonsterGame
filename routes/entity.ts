// takes what we need from the express library and imports into this page
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

router.use(function(req, res, next) {
	if (req.user)
		next();
	else
		res.redirect("/");
});

router.get("/:id", function(req, res, next) {
	Entity.findByIdAndUpdate(req.params.id).then(function(result: Entity) {
		if (result) {
			ItemInventory.findAll({where: {UserId: req.user.id, Count: {$gt: 0}}, include: [{model: Item, include: [ItemSlot, {model: ItemEffect, include: [EntityStateType]}]}]}).then(function(itemInventory: ItemInventory[]) {
				res.render("entity", { entity: result, inventory: itemInventory, user: req.user });
			});
		} else {
			res.redirect("/");
		}
	});
});

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
