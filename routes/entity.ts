// takes what we need from the express library and imports into this page
import {Router} from "express";
import Entity from "../models/Entity";
import EntityType from "../models/EntityType";
import EntityStateType from "../models/EntityStateType";
import EntityStateValue from "../models/EntityStateValue";

let router = Router();

router.use(function(req, res, next) {
	if (req.user)
		next();
	else
		res.redirect("/");
});

router.get("/:id", function(req, res, next) {
	Entity.findOne({ where: { id: req.params.id }, include: [ EntityType, EntityStateValue ]}).then(function(result){
		EntityStateType.findAll().then(function(entityStateTypes) {
			if (result) {
				res.render("entity", { entity: result, stateTypes: entityStateTypes, user: req.user });
			} else {
				res.redirect("/");
			}
		});
	});
});
module.exports = router;
