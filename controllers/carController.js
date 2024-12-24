const Car = require("../models/carModel");
const User = require('../models/userModel'); // Si nécessaire, importez également le modèle d'utilisateur

module.exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const cars = await Car.findById(id).populate("owner");
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);

    await User.updateMany({}, { $pull: { cars: car._id } });


    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addCar = async (req, res) => {
  try {
    const { brand, model, year } = req.body;
    const car = new Car({ brand, model, year });
    await car.save();

    // const { brand, model, year, ownerId } = req.body;
    // const car = await Car.findByIdAndUpdate(id, { brand, model, year, owner: ownerId }, { new: true });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, year } = req.body;
    const car = await Car.findByIdAndUpdate(
      id,
      { brand, model, year },
      { new: true }
    );
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affectation = async (req, res) => {
    try {
      const { idCar , idOwner } = req.body;
    // conster idOwner res.session.user._id 
      const car = await Car.findByIdAndUpdate(idCar, { owner: idOwner }, { new: true });

      await User.findByIdAndUpdate(idOwner, { $push: { cars: idCar } });

  
      res.status(201).json(car);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.desaffectation = async (req, res) => {
    try {
      const { idCar , idOwner } = req.body;

      const car = await Car.findByIdAndUpdate(idCar, { owner: "" }, { new: true });

      await User.findByIdAndUpdate(idOwner, { $pull: { cars: idCar } });

  
      res.status(201).json("desaffected");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };