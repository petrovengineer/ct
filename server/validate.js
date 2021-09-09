function validate(req, res, next){
    console.log("Validate: User Id = ", req._id)
    if(!req._id)res.sendStatus(401)
    
}

module.exports = validate;