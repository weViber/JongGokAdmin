const db = require("../models");
const { reservation : Reservation } = db;

exports.reservation = async (req, res) => {
    await Reservation.find({}).sort({_id : -1}).then(result=>
        res.status(200).json(result)
    )
}

exports.update = async (req, res) => {
    await Reservation.updateOne({_id : req.body._id}, {$set : {RVstatus : req.body.RVstatus}}).then(result=>
        res.status(200).json(result)
    )
}