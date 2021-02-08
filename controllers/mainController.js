const mongoose = require("mongoose");
const Department = mongoose.model("Department");
const Counter = mongoose.model("Counter");
const Queue = mongoose.model("Queue");
const ObjectID = require("mongodb").ObjectID;
const { validationResult } = require("express-validator");

// --------- dashboard & call --------
exports.homePage = async (req, res) => {
  const queue = await Queue.count();
  const call = await Queue.count({ called: "Yes" });
  console.log(queue);
  res.render("index", { queue: queue, called: call });
};

exports.display = async (req, res) => {
  const queue = await Queue.find();
  res.render("display", { queues: queue });
};

// const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

exports.callPost = async (req, res, next) => {
  const ment = await req.body.name;
  const counts = await req.body.counter;
  const dept = await Queue.findOne({
    department: ment,
    called: { $ne: "Yes" }
  }).catch(next);
  const theid = dept._id;
  await Queue.update({ _id: theid }, { called: "Yes", counter: counts });

  console.log(dept);
  console.log(ment);
  res.redirect("call");
};

exports.callPage = async (req, res) => {
  const count = await Counter.find();
  const dept = await Department.find();
  const queue = await Queue.find();
  res.render("call", { depts: dept, counts: count, queues: queue });
};

//-------- Dept & counter -----------
exports.newCounter = (req, res) => {
  res.render("newCounter");
};
exports.newDepartment = (req, res) => {
  res.render("newDepartment");
};

//--------- new user ------/

//------ queue ---------
exports.queueView = async (req, res) => {
  const dept = await Department.find();
  res.render("queue", { depts: dept });
};

exports.queuePage = async (req, res) => {
  const depts = await req.body.department;
  const tokenNum = await depts.substring(0, 3).toUpperCase();
  const indebt = await Queue.count({ department: depts });
  const current = (await indebt) + 1;
  const tokenNow = await `${tokenNum}-${current}`;
  const newqueue = await new Queue({
    name: req.body.name,
    department: req.body.department,
    token: tokenNow,
    called: "No",
    counter: "null"
  });
  await newqueue.save();
  res.redirect("queue");
};

// --------- view route -----------
exports.viewCounter = async (req, res) => {
  const count = await Counter.find();
  res.render("viewcounter", { counts: count });
};
exports.viewDepartment = async (req, res) => {
  const dept = await Department.find();
  res.render("viewdepartment", { depts: dept });
};

//---------- create route ----------
exports.createDepartment = async (req, res) => {
  const department = new Department(req.body);
  await department.save();
  res.render("viewdepart");
};

exports.createCounter = async (req, res) => {
  const counter = new Counter(req.body);
  await counter.save();
  res.redirect("viewcount");
};

// --------- settings & users -------
exports.users = (req, res) => {
  res.render("users");
};

//const counter = new Counter(req.body);
//await counter.save();
