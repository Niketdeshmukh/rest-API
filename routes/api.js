const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/students", function (req, res) {
  res.send({ type: "GET" });
});

router.post("/students", function (req, res) {
  res.send({
    type: "POST",
    name: req.body.name,
    roll: req.body.roll,
  });
});

router.put("/students/:id", function (req, res) {
  res.send({ type: "PUT" });
});
router.delete("/students/:id", function (req, res) {
  res.send({ type: "DELETE" });
});

module.exports = router;

router.get("/students", function (req, res, next) {
  Student.find({})
    .then(function (students) {
      res.send(students);
    })
    .catch(next);
});

router.post("/student", function (req, res, next) {
  Student.create(req.body)
    .then(function (student) {
      res.send(student);
    })
    .catch(next);
});

router.put("/students/:id", function (req, res, next) {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (
    student
  ) {
    Student.findOne({ _id: req.params.id }).then(function (student) {
      res.send(student);
    });
  });
});

router.delete("/student/:id", function (req, res, next) {
  Student.findOneAndDelete({ _id: req.params.id }, req.body).then(function (
    student
  ) {
    res.send(student);
  });
});
