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
import EntityStateValue from "../models/EntityStateValue";
import Entity from "../models/Entity";
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
					ItemEffect.findAll().then(function(effects){
						console.log(effects);
						resolve({itemSlots: slots, itemEffects: effects});
					});
				});
			});
			break;
		case "itemeffect":
			formData = new Promise(function(resolve) {
				EntityStateType.findAll().then(function(slots) {
					resolve({entityStateTypes: slots});
				});
			});
			break;
		case "entity":
			formData = new Promise(function(resolve) {
				EntityType.findAll().then(function(slots) {
					resolve({entityTypes: slots});
				});
			});
			break;
		default:
			formData = new Promise(function(resolve) { resolve(); });
			break;
	}

	return formData;
}

router.get("/new/:type", function(req, res, next) {
	switch (req.params.type) {
		case "entity":
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

function getDBClassFromType(type: string) {
	switch (type) {
		case "user":
			return User;
		case "item":
			return Item;
		case "itemeffect":
			return ItemEffect;
		case "itemslot":
			return ItemSlot;
		case "entitytype":
			return EntityType;
		case "entitystatetype":
			return EntityStateType;
		default:
			return undefined;
	}
}

router.get("/edit/:type/:id", function(req, res, next) {
	var dbClass = getDBClassFromType(req.params.type);

	if (dbClass === undefined) {
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

function handleFormPost(type: string, data: any): Promise<any> {
	var dbClass = getDBClassFromType(type);

	if (dbClass === undefined)
		return new Promise(function(resolve) { resolve(); });

	var dbData: any = {};

	switch (type) {
		case "itemslot":
			dbData.Name = data.name;
			break;
		case "user":
			dbData.UserName = data.username;
			dbData.AccountType = data.accountType;
			if (data.password)
				dbData.Password = User.hashPassword(data.password);
			break;
		case "entitystatetype":
			dbData.Name = data.inputEntityStateTypeName;
			dbData.MaxValue = data.maxvalue;
			dbData.MinValue = data.minvalue;
			break;
		case "entitytype":
			dbData.DefaultName = data.defaultName;
			dbData.PictureID = data.pictureID;
			break;
		case "itemeffect":
			dbData.EffectName = data.effectName;
			dbData.Duration = data.effectDuration;
			dbData.Offset = data.effectOffset;
			dbData.Flag = data.effectFlag;
			dbData.EntityStateType = data.entityStateType;
			break;
		case "item":
			dbData.Name = data.name;
			dbData.ItemSlotId = data.itemSlot;
			dbData.ItemEffect = data.effectID;
			break;
		default:
			return new Promise(function(resolve) { resolve(); });
	}

	if (data.id === undefined)
		return dbClass.create(dbData);
	else
		return dbClass.update(dbData, {where: { id: data.id }});
}

router.post("/new/:type", function(req, res, next) {
	req.body.id = undefined;
	switch ( req.params.type ) {
		case "entity":
			newEntity(req.body, req.user.id).then(function() {
				res.redirect("/edit/user/" + req.user.id);
			});
			break;
		default:
			handleFormPost(req.params.type, req.body).then(function() {
				res.redirect("/admin");
			});
	}

});

function newEntity(data: any, userId: string): Promise<any> {
	EntityStateType.findAll().then(function(slots) {
		// resolve({entityStateTypes: slots});
		let dbData: any = {};
		dbData.Name = data.name;
		dbData.UserId = userId;
		dbData.EntityTypeId = data.entityTypes;
		Entity.create(dbData).then(function(data) {
			let newEntity:any = data;

			for ( let i of slots) {
				dbData = {};
				dbData.Value = 0;
				dbData.EntityId = newEntity.id;
				dbData.EntityStateType = i.id;
				EntityStateValue.create(dbData);
			}

			return new Promise(function(resolve) { resolve(); });
		});
	});
};

router.post("/edit/:type/:id", function(req, res, next) {
	req.body.id = req.params.id;
	handleFormPost(req.params.type, req.body).then(function() {
		if ( req.params.type === "entity") res.redirect("/edit/user/" + req.user.id);
		else res.redirect("/admin");
	});
});

module.exports = router;
