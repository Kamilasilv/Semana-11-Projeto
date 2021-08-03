const travels = require("../models/travels.json");
const utils = require("../utils/travelsUtils");

const fs = require("fs");

const getAllTravels = (req, res) => {
    res.status(200).send(travels)
};

const getAllTravelsOrder = (req, res) => {
    let filteredTravel = travels.filter(quant => quant.busInfos.capacity >0);
    let capacityTravel =  filteredTravel.sort((a, b )=> {

        return (a.busInfos.capacity > b.busInfos.capacity) ? 1 : ((b.busInfos.capacity > a.busInfos.capacity) ? -1 : 0 )
    })
    res.status(200).send(capacityTravel)
}

const getTravelById = (req, res) => {
    let idRequerido = req.params.id;
    let filteredTravel = utils.findById (travels, idRequerido);

    res.status(200).send(filteredTravel)
}

const createPassenger = (req, res) => {
    
    let {name, email, documentNumber} = req.body;

    let idRequerido = req.params.id;

    let newPeople = {
     id: Math.random().toString(32).substr(2), 
     name,
     email,
     documentNumber,
     travelId: filteredTravel.travelId
    }
    let filteredTravel = utils.findById(travels, idRequerido)
    //let filteredTravel = travels.find( t => t.id == idRequerido)

    travels.forEach((travel) => {
        let sameId = travel === filteredTravel
        if (sameId){
            travel.passengersInfos.push(newPeople)
        }
    })
    fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', () => {})
    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
        if (err) {
            res.status(500).send({
                "message": err
            })
        } else {
            // enviar a resposta pro postman
            res.status(201).send({ "message": "Passageiro adicionado à viagem com sucesso", filteredTravel });
        }
    });
}
const createDriver = (req, res) => { 
    
    let idreq = req.params.id;
    const { name, license} = req.body 

    let newDriver = {
        id: Math.random().toString(32).substr(2),
        name,
        license,
    }

    let filteredTravel = utils.findById(travels, idreq)

    travels.forEach((travels) => {
        let sameTravel = travels == filteredTravel
        if(sameTravel){
            travels.driverInfos = []
            travels.driverInfos.push(newDriver)
        }
    })
    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
        if (err) {
            res.status(500).send ({
                "message": err
            })
        } else{
            res.status(200).send({ "message": "Motorista criado e adicionado  á viagem com sucesso",
            filteredTravel
            })
        }
    })
};

const updateDriver = (req, res) => { //substituir motorista
    let idDriver = req.params.id;
    let {id, name, license} =  req.body;

    let filteredDriver = utils.findById(travels, idDriver )
    let driverIndex = travels.indexOf(filteredDriver)

    let updatedDriver = {
        id,
        name,
        license
    }
      if ( driverIndex >= 0){
         travels.splice(driverIndex, 1, updatedDriver)
    
    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
        if (err) {
            res.status(500).send({
                "message": err
            })
        } else {
            res.status(201).send({ "message": "Motorista substituido com sucesso", 
            filteredDriver });
        }
    });
 } else{
     res.status(404).send({  "message": "Motorista não encontrado para ser substituido"})
 }
}

const replaceDriver = (req, res) => { //atualizar qualquer dado do motorista
    let idDriver = req.params.id;
    let updatedDriver = req.body;

    let driverFound = travels.find(travels => travels.driverInfos.id == idDriver)
    let driverIndex = travels.indexOf(driverFound)
    driverFound.driverInfos = updatedDriver 
    if(driverIndex >=0 ) {
        travels.splice(driverIndex, 1, driverFound)
        
        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ "message": err})
            }
            else{
                const driverUpdated = travels.find(travels => travels.driverInfos.id == idDriver)
                res.status(200).send({ 
                    "message": "Motorista atualizado com sucesso.",
                    driverUpdated
                })
            }
        })
    } else {
        res.status(404).send ({ "message": "Motorista não encontrado para ser atualizado."})
    }
}

const deleteTravel = (req, res) => { //deletar uma viagem 
    const idRequerido = req.params.id;
    const filteredId = utils.findById(travels, idRequerido)

    const index = travels.indexOf(filteredId)
    
    if(index >=0 ){
        travels.splice(index, 1)

        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
            if(err) {
                res.status(500).send({"message": err})
            }
            else{
                res.status(200).send({
                    "message": "Viagem deletada com sucesso",travels
                })
            }
        })
    }
}

module.exports = { getAllTravels, getAllTravelsOrder, getTravelById, createPassenger, createDriver, updateDriver, replaceDriver, deleteTravel }