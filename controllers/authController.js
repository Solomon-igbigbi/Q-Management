const passport = require("passport");

exports.login = (req, res) => {
  res.render("login");
};

exports.lockPage = (req, res) => {
  res.render("lock");
};

exports.loggingin = passport.authenticate("local", {
  failureRedirect: "/login",
  faliureFlash: "Failed Login",
  successRedirect: "/",
  sucessFlash: "You have successfully logged in"
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("you have successfuly loggedout");
  res.redirect("/login");
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash("error", "Opps! you have to be logged in");
  res.redirect("/login");
};
