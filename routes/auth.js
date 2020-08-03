var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { signout, signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name should be at least 3 chars long"),
    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 char"),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 3 }).withMessage("password is required"),
  ],
  signin
);
router.get("/signout", signout);



module.exports = router;
