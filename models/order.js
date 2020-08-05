var mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    transactionId: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    status: {
      type: String,
      default: "",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

module.exports = {
  Order,
  ProductCart,
};
