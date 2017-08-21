// takes what we need from the express library and imports into this page
import {Router} from "express";
var router = Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	console.log(req.user);
	res.render("index", { title: "Express" });
});

module.exports = router;
