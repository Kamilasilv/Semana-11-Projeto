const express = require("express");
const router = express.Router();

const travelsController = require("../controllers/travelsControllers")
const passengersController = require("../controllers/passengersControllers")

//DAS VIAGENS

router.get("/travels" , travelsController.getAllTravels); //OK
router.get("/travels/capacity", travelsController.getAllTravelsOrder)
router.get("/travels/:id" , travelsController.getTravelById); //OK 

router.post("/travels/:id/passenger/create" , travelsController.createPassenger); //OK 
router.delete("./travels/:id/delete", travelsController.deleteTravel) //deletar uma viagem

//DO MOTORISTA
router.post("/travels/:id/driverCreate", travelsController.createDriver); //Criar motorista em um viagem OK

router.put("/travels/updateDriver/:id", travelsController.updateDriver); // substituir motorista

router.patch("/travels/update/:id", travelsController.replaceDriver); //atualizar qualquer dado

//DOS PASSAGEIROS

router.get("/passengers", passengersController.getAllPassengers); //OK

router.delete("/passengers/:id", passengersController.deletePassenger); //OK

router.put("/passengers/update/:id" , passengersController.replacePassenger); //OK

router.patch("/passengers/updateName/:id" ,passengersController.updateName); //OK

module.exports = router