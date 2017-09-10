// takes what we need from the express library and imports into this page
import {Router} from "express";

let router = Router();

/* GET home page. */
router.get("/:id", function(req, res, next) {
	if (req.params.id) {
		res.render("entityView", { user : req.user, entity : req.params.id});
	} else {
		res.redirect("auth/login");
	}
});

module.exports = router;
