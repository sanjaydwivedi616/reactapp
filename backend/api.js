const express = require("express");
const router = express.Router();
const user = require("./DataModel");
const DBConnection = require("./DBConnection")
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const userList = await user.find();
    res.json(userList)
  } catch (error) {
    res.json({
      msg: `we are not faching any record ${error}`
    })
  }
})

router.post("/", async (req, res) => {
  try {
    const newUser = new user({
      _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      DOB: req.body.DOB,
      gender: req.body.gender,
      idProof: req.body.idProof,
      edited: req.body.edited,
      address: {
        nationality: req.body.address.nationality,
        states: req.body.address.states,
        city: req.body.address.city,
        street: req.body.address.street,
        zipCode: req.body.address.zipCode
      }
    })

    const newUserList = await user.insertMany(newUser);

    res.json(newUserList)
  } catch (error) {
    res.json({
      msg: `Data insert error! ${error}`
    })
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateUser = await user.updateOne({ _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          DOB: req.body.DOB,
          gender: req.body.gender,
          idProof: req.body.idProof,
          edited: req.body.edited,
          address: {
            nationality: req.body.address.nationality,
            states: req.body.address.states,
            city: req.body.address.city,
            street: req.body.address.street,
            zipCode: req.body.address.zipCode
          }
        }
      });
    res.json(updateUser)
  } catch (error) {
    res.json({
      msg: `Data Update error ${error}`
    })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    let userList = await user.deleteOne({ _id: req.params.id });
    res.json(userList);
  } catch (error) {
    res.json({
      msg: `${error}`
    })
  }
})


module.exports = router