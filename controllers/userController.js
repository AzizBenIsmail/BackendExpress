const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

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
    const users = await userModel.find().populate("cars");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userModel.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUsersSortDate = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUsersByDateX = async (req, res) => {
  try {
    const { date } = req.body;
    console.log(req.query);
    const users = await userModel.findByCreationDateAllDay(date);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("not_found");
    }
    const users = await userModel.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.UpdateUserClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found !");
    }
    updated = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { firstName, lastName },
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.UpdatePwdUserClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found !");
    }
    const salt = await bcrypt.genSalt();
    passwordHash = await bcrypt.hash(password, salt);
    updated = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { password: passwordHash },
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.AddUserClientWithImg = async (req, res) => {
  try {
    const { username, password } = req.body;
    const role = "client";
    const image_user = req.file.filename;
    console.log(req.body);
    const user = await userModel.create({
      username,
      password,
      role,
      image_user,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const path = require("path");
const fs = require('fs')

module.exports.updateUserWithImg = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer l'utilisateur actuel
    const user = await userModel.findById(id);

    const userData = { ...req.body };

    // Si un fichier est téléchargé, gérer l'image
    if (req.file) {
      // Sauvegarder le chemin de l'ancien fichier avant de mettre à jour
      const oldFilePath = path.join(
        __dirname,
        "..",
        "public",
        "files",
        user.image_user
      );

      // Assigner le nouveau fichier à userData
      userData.image_user = req.file.filename;

      // Supprimer l'ancien fichier s'il existe et s'il n'est pas une image par défaut
      if (user.image_user && user.image_user !== "client.png") {
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error("Error deleting previous file:", err.message);
          } else {
            console.log("Previous file deleted:", oldFilePath);
          }
        });
      }
    }

    // Mettre à jour les données de l'utilisateur
    const updated = await userModel.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true } // Retourner l'utilisateur mis à jour
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Spread
//const arr1 = [1, 2, 3];
//const arr2 = [...arr1, 4, 5]; // Résultat : [1, 2, 3, 4, 5]
