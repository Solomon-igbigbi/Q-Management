const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { promisify } = require("es6-promisify");
// const { sanitizeBody } = require("express-validator");

exports.register = (req, res) => {
  res.render("register");
};

exports.users = async (req, res) => {
  const user = await User.find();
  console.log(user);
  res.render("users", { users: user });
};

exports.newUser = (req, res) => {
  res.render("createusers");
};

// exports.createUser = (req, res) => {
//   res.redirect("createusers");
// };

exports.createUser = async (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (await !errors.isEmpty()) {
    res.redirect("newUser");
    // res.render("createusers", { error: errors.array() });
  }

  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.email
  });
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("newUser");
    } else {
      res.redirect("users");
    }
  });
  // const register = promisify(User.register, User);
  // await register(user, req.body.password);
  // console.log("it works");
  // re;

  // if (errors) {
  //   req.flash("error", errors.map(err => err.msg));
  //   // res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
  //   console.log("messages");
  //   return; // stop the fn from running
  // }
};

// exports.validateRegister = (req, res, next) {
//   req.sanitizeBody
// }
