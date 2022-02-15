const jwt = require("jsonwebtoken")

const userAuthentication = async (req, res, next) => {
    try {
        const token =req.cookies.jwtToken;
        const verifyuser = jwt.verify(token, "suyashkaransupriyakaransourabhkaranmonikasubodhkolisupriyakarandivyasinghsonali")
        if(!verifyuser){
           res.send("Please Login again..")
        }else{
            console.log(verifyuser)
            next();
        }
    } catch (err) {
        res.redirect("/login")
        // res.status(401).send("Your Session has been expired ,Please login again")
    }
}
module.exports = 
    userAuthentication

