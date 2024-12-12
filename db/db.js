const mongoose = require("mongoose");

module.exports.connectToDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.Url_Db)
    .then(() => {
      console.log("connect to db");
    })
    .catch((error) => {
      console.log(error);
    });
};


// const oracledb = require("oracledb");

// module.exports.connectToDb = async () => {
//   try {
//     // Configuration des options de connexion
//     const connection = await oracledb.getConnection({
//       user: process.env.DB_USER,       // Nom d'utilisateur Oracle
//       password: process.env.DB_PASS,   // Mot de passe Oracle
//       connectString: process.env.DB_URL // URL de connexion (host:port/service_name)
//     });
    
//     console.log("Connecté à la base Oracle avec succès !");
    
//     // Faites ce que vous voulez avec la connexion ici.
//     return connection; // Renvoie la connexion si nécessaire.
//   } catch (error) {
//     console.error("Erreur de connexion à la base Oracle :", error);
//   }
// };
