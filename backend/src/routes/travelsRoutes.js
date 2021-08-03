const express = require("express");
const router = express.Router();

const travelsController = require("../controllers/travelsControllers")
const passengersController = require("../controllers/passengersControllers")

//DAS VIAGENS

router.get("/travels" , travelsController.getAllTravels); 
router.get("/travels/capacity", travelsController.getAllTravelsOrder)
router.get("/travels/:id" , travelsController.getTravelById);

router.post("/travels/:id/passenger/create" , travelsController.createPassenger); 
router.delete("./travels/:id/delete", travelsController.deleteTravel) 

//DO MOTORISTA
router.post("/travels/:id/driverCreate", travelsController.createDriver); 

router.put("/travels/updateDriver/:id", travelsController.updateDriver); 

router.patch("/travels/update/:id", travelsController.replaceDriver); 

//DOS PASSAGEIROS

router.get("/passengers", passengersController.getAllPassengers); 

router.delete("/passengers/:id", passengersController.deletePassenger); 

router.put("/passengers/update/:id" , passengersController.replacePassenger); 

router.patch("/passengers/updateName/:id" ,passengersController.updateName); 

module.exports = router