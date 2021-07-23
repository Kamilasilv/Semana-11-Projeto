const travels = require("../models/travels.json");
const passengers = require("../models/passengers.json");
const fs = require("fs");

const utils = require("../utils/travelsUtils");

const getAllPassengers = (req, res) => {
    res.status(200).send(passengers)
};
   
const replacePassenger = (req, res) => {
    const idReq = req.params.id;
    const {
        name,
        email,
        documentNumber
    } = req.body

    let filteredPassenger = utils.findById (passengers, idReq)
    const index = passengers.indexOf (filteredPassenger)

    let updatePassenger = {
        id: idReq,
        name,
        email,
        documentNumber
    }
    if (index >= 0){
        passengers.splice(index, 1, updatePassenger )
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function (err){
            if (err) {
                res.status(500).send({ "message": err })
            } 
            else{
                res.status(200).send({
                    "message": "Passageiro substituido no sistema com sucesso", 
                    updatePassenger
                })
            }
        })

    } else{
         res.status(404).send({ "message": "Passageiro não encontrado para ser substituido."})
    }
};

//atualizar apenas o nome 
const updateName = (req, res) => {
    const idReq = req.params.id; 
    let newName = req.body.name

    let filteredPassenger = utils.findById(passengers, idReq);
    if (filteredPassenger) {
        filteredPassenger.name = newName

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function (err) {
            if (err){
                res.status(500).send({ "message": err })
            }
            else{
                res.status(200).send({ "message": " Nome do passageiro atualizado com sucesso."
                , filteredPassenger})
            }
        })
    } else{
        res.status(500).send({ "message": "Passageiro não encontrado."})
    }
    
}
    
const deletePassenger = (req, res) => { 
    let idRequerido = req.params.id

    let filteredPassenger = utils.findById(passengers, idRequerido);
    console.log("passengers: ", passengers)

    const index = passengers.indexOf(filteredPassenger)

    if(index >= 0) {
        passengers.splice(index, 1)

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf-8', (err) => {
            if(err){
                res.status(500).send({ "message": err})
            } else{
                res.status(200).send({"mensagem": "Passageiro deletado com sucesso." , passengers
            })
                
           }
        })
    }
}

module.exports = { getAllPassengers, replacePassenger, updateName, deletePassenger }
