const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/donasi/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuth = require(appDir + '/middleware/jwtAuth');

router.post('/', jwtAuth, upload.single('image'), Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.create(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Create Info Donasi Successfully", data, 201);
          }else{
            Responser.error(res, "Error Creating Info Donasi: " + error.message, error, 400);
        }
    })
});

router.get('/', async (req, res, next) => {
    await query.findOne(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Info Donasi Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Info Donasi: " + error.message, error, 400);
        }
    })
});

router.patch('/', jwtAuth, upload.single('image'), Validator.update, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.update(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Update Info Donasi Successfully", data, 200);
          }else{
            Responser.error(res, "Error Update Info Donasi: " + error.message, error, 400);
        }
    })
});

router.delete('/', jwtAuth, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Info Donasi Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Info Donasi: " + error.message, error, 400);
        }
    })
});


module.exports = router;