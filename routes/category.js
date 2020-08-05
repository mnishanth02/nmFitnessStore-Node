var express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/category");

// Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// Actual Routes
router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/:categoryId", getCategory);
router.get("getAllCategories", getAllCategories);

router.put(
  "/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
    "/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory
  );


module.exports = router;
