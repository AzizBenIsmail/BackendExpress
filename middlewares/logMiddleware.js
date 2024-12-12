const fs = require("fs");

function logMiddleware(req, res, next) {
  const startTime = new Date(); // Temps de début de la requête

  res.on("finish", () => {
    const headers = JSON.stringify(req.headers);
    const endTime = new Date(); // Temps de fin de la requête
    const executionTime = endTime - startTime; // Temps d'exécution en millisecondes
    const body = Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : "N/A";
    const referer = req.headers.referer || "N/A";
    const log = `
      ${new Date().toISOString()} - 
      Méthode: ${req.method} 
      URL: ${req.originalUrl} 
      IP: ${req.ip} 
      Referer: ${referer} 
      Statut: ${res.statusCode} 
      Utilisateur: ${req.user ? `${req.user._id} | ${req.user.username}` : "N/A"} 
      Headers: ${headers} 
      Temps d'exécution: ${executionTime} ms 
      Corps de la requête: ${body} 
      Résultat: ${res.locals.data || "N/A"}
    `;

    try {
      fs.appendFileSync("app.log", log);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement dans le fichier journal :", err);
    }
  });

  next();
}

module.exports = logMiddleware;
