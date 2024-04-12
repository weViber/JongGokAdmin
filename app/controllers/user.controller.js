const db = require("../models");
const { user : User } = db;

exports.login = async (req, res) => {
    console.log('req', req.body )
    const resultUser = await User.findOne({ID : req.body.ID})
    if(!resultUser){
        return res.status(200).json({ message : "ID ERR" })
    }
    if(resultUser){
        console.log('PW', resultUser.PW )
        if(resultUser.PW == req.body.PW){
            return res.status(200).json({ message : "success", resultUser})
        } else {
            return res.status(200).json({ message : "PW ERR" })
        }
    } 
}
