// takes what we need from the express library and imports into this page
import {Router} from "express";
import Entity from "../models/Entity";

let router = Router();

router.get("/:id", function(req, res, next) {

	Entity.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(result){
		if (req.params.id) {
			res.render("entity", { entity: Entity});
		} else {
			res.redirect("/");
		}
	});
});
module.exports = router;
