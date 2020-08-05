const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../models/product");

// Middleware
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.creaetProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    //handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big!",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Product failed",
        });
      }
      res.status(201).json({ product });
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.status(200).json({});
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.status(200).send(req.product.photo.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    let product = req.product;
    // updation
    product = _.extend(product, fields);

    //handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big!",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "updating Product failed",
        });
      }
      res.status(200).json({ product });
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;

  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete the product : ${deletedProduct.name}`,
      });
    }

    res.status(200).json({
      message: "Deletion was a successfull",
      deleteProduct,
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? parseInt(req.query.sortBy) : "_id";

  Product.find()
    .select("-photo")
    .populate("categoty")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }

      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category Found",
      });
    }

    res.status(200).json(category);
  });
};

//middleware
exports.updateSock = (req, res, next) => {
  let myOperation = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperation, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: `Bulk operation failed : ${deletedProduct.name}`,
      });
    }
    next();
  });
};
