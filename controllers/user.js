const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user is found in DB",
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res, next) => {
  // TODO - need password to send
  return res.status(200).json(req.profile);

  next();
};
