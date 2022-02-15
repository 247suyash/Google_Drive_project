"use strict";
const { ImageModel } = require("../models");
const { Email, AVAILABE_TEMPLATE } = require("../utils/requestEmail");

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
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
 * @api {post} /image/requestAccess request Access
 * @apiName request email
 * @apiGroup image
 * @apiDescription request access of image  
 * @apiBody {string} image
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   redirect : "/",
 *}
 * HTTP/1.1 422 UNPROCESSABLE ENTITY
 * {
 *    "error" : "Email is not sent..."
 * }
 */
const requestAccess = async (req, res) => {
  try {
    const { email } = req.body
    console.log(" access app.js api call", email)

    const emailClint = new Email()
    emailClint.setTemplate(AVAILABE_TEMPLATE.REQUEST)
    emailClint.setbody()
    emailClint.send(email)
    return res.redirect("/")
  } catch (error) {
    res.status(406).send("Email is not sent...")
  }
};

/**
 * @api {post} /image/image image upload
 * @apiName image upload
 * @apiGroup image
 * @apiDescription upload gallery image  
 * @apiBody {string} image image of gallery
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   redirect : "/",
 *}
 * HTTP/1.1 422 UNPROCESSABLE ENTITY
 * {
 *    "error" : "Image is Required ...!"
 * }
 */

const store = async (req, res) => {
  try {
    console.log("app.js api call")
    const imageFile = req.file.filename;
    console.log("app.js api call", imageFile)

    await ImageModel.create({
      image: imageFile
    })
    return res.redirect("/")
  } catch (error) {
    res.status(406).send("Image is Required ...!")
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
  store,
  details,
  update,
  destroy,
  requestAccess
};
