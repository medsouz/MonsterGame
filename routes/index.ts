import {Router} from "express";

import Entity from "../models/Entity";
import EntityType from "../models/EntityType";

let router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	if (req.user) {
		Entity.findAll({where: {UserId: req.user.id}, include: [EntityType]}).then(function(entities) {
			res.render("index", { user : req.user, entityList: entities });
		});
	} else {
		res.redirect("auth/login");
	}
});

module.exports = router;
