const express = require("express");
const router = express.Router();
const user = require("./DataModel");
const DBConnection = require("./DBConnection")
const jwt = require("jsonwebtoken");

router.get("/registration", async (req, res) => {
  try {
    const userList = await user.find();
    res.json(userList)
  } catch (error) {
    res.json({
      msg: `we are not faching any record ${error}`
    })
  }
})

router.post("/registration", async (req, res) => {
  try {
    const newUser = new user({
      _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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
    console.log(newUser)
    const newUserList = await user.insertMany(newUser);
    res.json(newUserList);

  } catch (error) {
    res.json({
      msg: `Data insert error! ${error}`
    })
  }
});

router.put("/registration/:id", async (req, res) => {
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

router.delete("/registration/:id", async (req, res) => {
  try {
    let userList = await user.deleteOne({ _id: req.params.id });
    res.json(userList);
  } catch (error) {
    res.json({
      msg: `We are getting ${error} to delete ${req.params.id}`
    })
  }
})

router.post("/login", (req, res) => {

  let fetchedUser;
  user.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.json({
        message: "Email incorrect"
      });
    }
    fetchedUser = user;
    return (req.body.password == user.password);
  }).then(result => {
    if (!result) {
      return res.json({
        message: "Password incorrect"
      });
    }

    const token = jwt.sign({
      email: fetchedUser.email,
      userId: fetchedUser._id,
      name: fetchedUser.name,
    },
      "secret_this_should_be_longer", {
      expiresIn: "1h"
    });

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      name: fetchedUser.name,
    });
  }).catch(error => {
    res.json({
      msg: `User login Error !! ${error}`
    })
  })
})


module.exports = router