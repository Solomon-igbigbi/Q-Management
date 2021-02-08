const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { catchErrors } = require("../handlers/errorHandlers");
const { check } = require("express-validator");
const { sanitizeBody } = require("express-validator");

// Do work here
router.get("/", authController.isLoggedIn, mainController.homePage);
router.get(
  "/call",
  authController.isLoggedIn,
  catchErrors(mainController.callPage)
);
router.get("/queue", authController.isLoggedIn, mainController.queueView);
router.get("/users", authController.isLoggedIn, userController.users);
router.get("/display", authController.isLoggedIn, mainController.display);

// new dept and count
router.get("/newdept", authController.isLoggedIn, mainController.newDepartment);
router.get("/newcount", authController.isLoggedIn, mainController.newCounter);

// view dept and count
router.get(
  "/viewdept",
  authController.isLoggedIn,
  mainController.viewDepartment
);
router.get("/viewcount", authController.isLoggedIn, mainController.viewCounter);

//post route
router.post(
  "/call",
  authController.isLoggedIn,
  catchErrors(mainController.callPost)
);
router.post(
  "/newdept",
  authController.isLoggedIn,
  catchErrors(mainController.createDepartment)
);
router.post(
  "/newcount",
  authController.isLoggedIn,
  catchErrors(mainController.createCounter)
);
router.post(
  "/queue",
  authController.isLoggedIn,
  catchErrors(mainController.queuePage)
);

//auth route
router.post(
  "/newuser",
  authController.isLoggedIn,
  [
    sanitizeBody("name"),
    check("name", "Supply a Name")
      .not()
      .isEmpty(),
    check("name", "Name should  be at least 3 letters").isLength({
      min: 3,
      max: 30
    }),
    check("name", "password should in letter").isString(),
    check("email", "Please Supply an E-mail")
      .not()
      .isEmpty(),
    check("email", "Please Supply a valid E-mail").isEmail(),
    sanitizeBody("email").normalizeEmail({
      reomve_dots: false,
      remove_extension: false,
      gmail_remove_subadress: false
    }),
    check("password", "password cannot be empty")
      .not()
      .isEmpty()
  ],
  userController.createUser
);

router.post("/login", authController.loggingin);

// auth post route
router.get("/newuser", authController.isLoggedIn, userController.newUser);
router.get("/login", authController.login);
router.get("/logout", authController.isLoggedIn, authController.logout);

module.exports = router;
