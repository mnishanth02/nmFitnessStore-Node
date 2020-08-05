const Category = require("../models/category");

// Middleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};

// Controllers
exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }

    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(res.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No ategorys found",
      });
    }

    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const categoryy = req.category;
  categoryy.name = req.body.name;

  categoryy.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Category",
      });
    }

    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete Category",
      });
    }

    res.json({
      message: `${category.name} is successfully Deleted`,
    });
  });
};
