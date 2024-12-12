const userModel = require("../models/userModel");

module.exports.AddUserClient = async (req, res) => {
  try {
    const { username, password } = req.body;
    const role = "client";
    console.log(req.body);
    const user = await userModel.create({
      username,
      password,
      role,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
      const users = await userModel.find()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUserById = async (req, res) => {
  try {
    const { id } = req.params;
      const users = await userModel.findById(id)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getAllUsersSortDate = async (req, res) => {
  try {
      const users = await userModel.find().sort( {createdAt : -1})
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUsersByDateX = async (req, res) => {
  try {
    const {date} = req.body
    console.log(req.query)
    const users = await userModel.findByCreationDateAllDay(date)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};