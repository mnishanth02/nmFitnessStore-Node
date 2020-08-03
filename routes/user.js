var express = require("express");
var router = express.Router();

const { getUserById, getUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");





router.param("userId", getUserById);

router.get("/:userId", isSignedIn, isAuthenticated, getUser);

module.exports = router;
