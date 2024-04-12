const db = require("../models");
const { reservation : Reservation } = db;

const date = new Date();
const year = date.getFullYear();
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);

exports.reservation = async (req, res) => {
    const reservation = new Reservation({
        name : req.body.name,
        phone : req.body.phone,
        password : req.body.password,
        reqdate : year + month + day,
        resdate : req.body.resdate,
        option : req.body.option,
        text : req.body.text,
        RVstatus : '신규상담'
    })
    await reservation.save().then(
        result => res.status(200).json({ message : "성공" , result })
    ).catch(err => console.log(err))
}

exports.confirm = async (req, res) => {
    Reservation.findOne({ name: req.body.name, phone : req.body.phone, password : req.body.password }).sort({ _id : -1 }).then(result=>{
            if(result == null){
                res.status(200).json({message : "Fail"})
            } else {
                res.status(200).json(result)
            }
        }
    )
}
exports.update = async  (req, res) => {
    Reservation.updateOne({_id : req.body._id}, {$set : {
        name : req.body.name,
        phone : req.body.phone,
        resdate : req.body.resdate,
        option : req.body.option,
        text : req.body.text,
        amount : req.body.amount,
        payment : req.body.payment
    }}).then(result => res.status(200).json(result))
}

exports.changetime = async  (req, res) => {
    Reservation.updateOne({_id : req.body._id}, {$set : {
        name : req.body.name,
        phone : req.body.phone,
        resdate : req.body.resdate,
        option : req.body.option,
        text : req.body.text,
        amount : req.body.amount,
        payment : req.body.payment
    }}).then(result => res.status(200).json({message : "Success"}))
}

exports.paycomplete = async (req, res) => {
    Reservation.updateOne({merchant_uid : req.body.merchant_uid}, {$set : {
        paymentStatus : true
    }}).then(result => res.status(200).json({message : "Success"}))
}

exports.mobilecomplete = async (req, res) => {
    Reservation.findOne({ merchant_uid : req.body.merchant_uid }).sort({ _id : -1 }).then(result=>{
        if(result == null){
            res.status(200).json({message : "Fail"})
        } else {
            res.status(200).json(result)
            Reservation.updateOne({merchant_uid : req.body.merchant_uid}, {$set : {
                paymentStatus : true
            }})
        }
    })
}
