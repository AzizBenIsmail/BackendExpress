const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
// kjut jdrf eeca eguo
const nodemailer = require("nodemailer");
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

module.exports.getSessionUser = async (req, res) => {
  try {
    //const { id } = req.params;
    const user = req.session.user
    console.log("test",req.session)
    //const user = await userModel.findById(user.id);
    //const user = await User.findById(userId).populate({path: 'cars',populate: { path: 'manufacturer' }, // Relation imbriquée });
    res.status(200).json(user);
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

const jwt = require('jsonwebtoken');

const maxAge = 2 *60 * 60 //7200sc Duration

const createToken = (id) =>{
  return jwt.sign({id},'net militaire secret',{expiresIn: maxAge});
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg5OWI0ZDViODAzM2UxY2M
//1MTNiMyIsImlhdCI6MTY4Njc1MzQ4NCwiZXhwIjoxNjg2NzYwNjg0fQ
//.KPnsNPjL0PS3oyZ5l3mMC9GUc0ymgheVr-FYt_31pN0

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if(!username) {
      return res.status(200).json({message : 'username not found'})
    }
    const user= await userModel.login(username, password)
    const token = createToken(user._id)
    sendWelcomeEmail("e5demli.tn@gmail.com", username);

    res.cookie('jwt_token', token,{httpOnly : true , maxAge : maxAge * 1000})
    res.status(200).json({message : 'User successfully authenticated',user:user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logout = async (req, res) => {
  try {

    res.cookie('jwt_token', "",{httpOnly : true , maxAge : 1})
    req.session.destroy();
    res.status(200).json({message : 'User successfully logged out'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//kjut jdrf eeca eguo
//studyspheretn@gmail.com

function sendWelcomeEmail (email, nom) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const activationLink = `${process.env.Origin_Front}/auth/validation?email=${encodeURIComponent(email)}`
  const mailOptions = {
    from: 'studyspheretn@gmail.com', to: email, subject: 'Bienvenue sur notre site', html: `
      <html>
        <head>
          <style>
            /* Add your custom styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              padding: 20px;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 5px;
              box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              color: #555555;
            }
            h2 {
              color: #0000FF;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Bienvenue sur notre site</h1>
            <p>Cher</p> <h2> ${nom},</h2>
            <p>Nous sommes ravis de vous accueillir parmi nous !</p>
            <p>Veuillez cliquer sur le bouton ci-dessous pour activer votre compte :</p>
            <a href="${activationLink}" class="button">Activer mon compte</a>
            <p>Cordialement,<br>L'équipe du site</p>
          </div>
        </body>
      </html>
    `,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de bienvenue :', error)
    } else {
      console.log('E-mail de bienvenue envoyé avec succès !')
    }
  })
}
