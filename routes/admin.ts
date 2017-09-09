import {Router} from "express";
import {eAccountType} from "../models/User";
var router = Router();

/* GET admin home page. */
router.get("/", function(req, res, next) {
	if (req.user && req.user.AccountType === eAccountType.Admin)
		res.render("admin/admin", { user : req.user });
	else
		res.redirect("/");
});

module.exports = router;
