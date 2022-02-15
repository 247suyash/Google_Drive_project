const express = require('express')
const router = express.Router()
const { ImageController } = require('../controllers')
const {upload} =require("../middleware")
router.get('/' , ImageController.index)
router.post('/image',upload.upload, ImageController.store)
router.post('/requestAccess', ImageController.requestAccess)
router.put('/:id', ImageController.update)
router.delete('/', ImageController.destroy)
router.get('/:id', ImageController.details)

module.exports = router