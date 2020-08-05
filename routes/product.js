var express = require("express");
var router = express.Router();

const {
  getProductById,
  creaetProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params
router.param("userId", getUserById);
router.param("productId", getProductById);

// Actual Routes
router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  creaetProduct
);

router.get("/getAllProducts", getAllProducts);

router.get("/:productId", getProduct);
router.get("/getAllUniqueCategories", getAllUniqueCategories);
router.get("/photo/:productId", photo);

router.put(
    "/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
  );

router.delete(
  "/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

module.exports = router;
