import {Router} from "express";
import Item from "../models/Item";
import ItemInventory from "../models/ItemInventory";

let router = Router();

// check for logged in user
router.use(function(req, res, next) {
	if (req.user)
		next();
	else
		res.redirect("/");
});

// show user's item inventory with counts, and "store" to add items from list of all available items
router.get("/", function(req, res, next) {
	Item.findAll().then(function(result: any[]) {
		ItemInventory.findAll({where: {UserId: req.user.id}}).then(function(inventory: ItemInventory[]) {
			for (var x in result) {
				result[x].Count = 0;
				for (var i in inventory) {
					if (result[x].id === inventory[i].ItemId)
						result[x].Count = inventory[i].Count;
				}
			}
			res.render("store", { user: req.user, items: result });
		});
	});
});

// allow users to purchase items
router.post("/purchase/:id", function(req, res, next) {
	ItemInventory.findOne({where: {UserId: req.user.id, ItemId: req.params.id}}).then(function(inventory: ItemInventory) {
		var query;
		if (inventory) {
			query = inventory.update({Count: inventory.Count + Number(req.body.quantity)});
		} else {
			query = ItemInventory.create({UserId: req.user.id, ItemId: req.params.id, Count: req.body.quantity});
		}
		query.then(function() {
			res.redirect("/store");
		});
	});
});

module.exports = router;
