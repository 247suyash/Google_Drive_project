"use strict";

const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const { AVAILABE_TEMPLATE, Email } = require("../utils/email");
/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res, next) => {
  try {

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

const indexRegiter = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    console.log("loging details", email, password)
    // return res.status(200).render("home/home")
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

/**
 * @api {post} /user/login Login User
 * @apiName LoginUser
 * @apiGroup user
 * @apiDescription login user 
 * @apiBody {string} email email of registered user
 * @apiBody {string} password password of registered user
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   render : "/",
 *   data: login the user ,
 *}
 * HTTP/1.1 422 UNPROCESSABLE ENTITY
 * {
 *    "error" : Email Is Not Found , Please Enter Currect Email..."
 * }
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack
 * }
 */

const loginPost = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const verify = await UserModel.findOne({ email: email })

    if (verify.password == password) {
      const token = await verify.generateAuthtoken()
      console.log(token)
      res.cookie("jwtToken", token, {
        expires: new Date(Date.now() + 25852000000),
        httpOnly: true
      })
      return res.status(200).redirect("/")
    } else {
      return res.status(422).send("Please check Your Password ")
    }
  } catch (error) {
    return res.status(422).send("Email Is Not Found , Please Enter Currect Email...")
  }
};

/**
 * @api {post} /user/register Registration the User
 * @apiName RegisterUser
 * @apiGroup user
 * @apiDescription Register a new user
 * @apiBody {string} firstName first name of user
 * @apiBody {string} lastName last name of user
 * @apiBody {string} email email of user
 * @apiBody {string} phoneNumber phoneNumber of user
 * @apiBody {string} password password of user
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 201 CREATED
 * {
 *   redirect : login page
 *}
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack 
 * }
 */
const store = async (req, res, next) => {
  try {
    console.log("post api call")
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });
    const emailClint =new Email()
    emailClint.setTemplate(AVAILABE_TEMPLATE.SiGNUP)
    emailClint.setbody({
      name:firstName,
      lastName:lastName  
    })
     emailClint.send(email)
     return res.status(200)
      .redirect("/login")
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

/**
 * Get only single record
 * @param { req, res }
 * @returns JsonResponse
 */
const details = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Details fatched successfully.",
      data: {}
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
}

/**
 * update a record
 * @param { req, res }
 * @returns JsonResponse
 */
const update = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};
/**
 * Destroy a record
 * @param { req, res }
 * @returns JsonResponse
 */
const destroy = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

/**
 * Export as a single common js module
 */
module.exports = {
  index,
  indexRegiter,
  loginPost,
  store,
  details,
  update,
  destroy
};
