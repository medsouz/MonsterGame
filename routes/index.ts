// takes what we need from the express library and imports into this page
import {Router} from "express";

let router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	if (req.user) {
		res.render("index", { user : req.user, messages: req.flash("error")});
	} else {
		res.redirect("auth/login");
	}
});

module.exports = router;
