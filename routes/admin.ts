import {Router} from "express";
import User from "../models/User";
import {eAccountType} from "../models/User";
import EntityType from "../models/EntityType";
import EntityStateType from "../models/EntityStateType";
import Item from "../models/Item";
import ItemEffect from "../models/ItemEffect";
import ItemSlot from "../models/ItemSlot";
import * as path from "path";
import {Model} from "sequelize-typescript";
import * as Promise from "bluebird";
var router = Router();

// Only allow authenticated administrators onto admin panel
router.use(function(req, res, next) {
	if (req.user && req.user.AccountType === eAccountType.Admin)
		next();
	else
		res.redirect("/");
});

/* GET admin home page. */
router.get("/", function(req, res, next) {
	// TODO: Move to bluebird promise.map
	// Sequlize may have a way to query multiple tables at once
	User.findAll().then(function(users: User[]) {
		EntityType.findAll().then(function(entityTypes: EntityType[]) {
			EntityStateType.findAll().then(function(entityStateTypes: EntityStateType[]) {
				Item.findAll().then(function(items: Item[]) {
					ItemSlot.findAll().then(function(itemSlots: ItemSlot[]) {
						ItemEffect.findAll().then(function(itemEffects: ItemEffect[]) {
							// TODO: Dynamically feed all of these objects instead of in individual objects
							res.render("admin/admin", { user : req.user, userList: users, entityTypeList: entityTypes, entityStateTypeList: entityStateTypes, itemList: items, itemSlotList: itemSlots, itemEffectList: itemEffects });
						});
					});
				});
			});
		});
	});
});

function createFormData(type: string): Promise<any> {
	var formData;

	switch (type) {
		case "item":
			formData = new Promise(function(resolve) {
				ItemSlot.findAll().then(function(slots) {
					resolve({itemSlots: slots});
				});
			});
			break;
		case "itemeffect":
		case "itemslot":
		case "entitytype":
		case "entitystatetype":
		case "user":
		default:
			formData = new Promise(function(resolve) { resolve(); });
			break;
	}

	return formData;
}

router.get("/new/:type", function(req, res, next) {
	switch (req.params.type) {
		case "user":
		case "item":
		case "itemeffect":
		case "itemslot":
		case "entitytype":
		case "entitystatetype":
			createFormData(req.params.type).then(function(additionalData) {
				console.log(additionalData);
				res.render("admin/form", { user : req.user, type: req.params.type, formData: additionalData });
			});
			return;
		default:
			res.redirect("/admin");
			return;
	}
});

router.get("/edit/:type/:id", function(req, res, next) {
	var dbClass;
	switch (req.params.type) {
		case "user":
			dbClass = User;
			break;
		case "item":
			dbClass = Item;
			break;
		case "itemeffect":
			dbClass = ItemEffect;
			break;
		case "itemslot":
			dbClass = ItemSlot;
			break;
		case "entitytype":
			dbClass = EntityType;
			break;
		case "entitystatetype":
			dbClass = EntityStateType;
			break;
		default:
			res.redirect("/admin");
			return;
	}

	dbClass.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(result){
		createFormData(req.params.type).then(function(additionalData) {
			if (result != null)
				res.render("admin/form", { user : req.user, type: req.params.type, data: result, formData: additionalData });
			else
				res.redirect("/admin");
		});
	});
});

module.exports = router;
