// dateFilterPlugin.js
module.exports = function dateFilterPlugin(schema) {
    schema.statics.findByCreationDateAllDay = async function (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0); // Début de la journée
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999); // Fin de la journée
  
      return this.find({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
    };
    schema.statics.findByCreationDateHalfDay = async function (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(11, 0, 0, 0); // Début de la journée
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999); // Fin de la journée
  
      return this.find({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
    };
  };
  