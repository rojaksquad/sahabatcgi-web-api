const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/dataSpesialis/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuth = require(appDir + '/middleware/jwtAuthPengurus');
const check_status = require(appDir + '/middleware/check_status');

router.post('/', jwtAuth, check_status, upload.none(), Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.create(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Create Data Spesialis Successfully", data, 201);
          }else{
            Responser.error(res, "Error Creating Data Spesialis: " + error.message, error, 400);
        }
    })
});

router.get('/', async (req, res, next) => {
    await query.findAll(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Data Spesialis Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Data Spesialis: " + error.message, error, 400);
        }
    })
});

router.get('/:id', async (req, res, next) => {
    await query.findOne(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Data Spesialis by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Data Spesialis by ID: " + error.message, error.result || error, error.code || 400);
        }
    })
});

router.patch('/:id', jwtAuth, check_status, upload.none(), Validator.update, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    if (req.file === 'invalid_file_type') {
        Responser.error(res, req.fileValidationError, {}, 400);
        return;
    }

    await query.update(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Update Data Spesialis by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Update Data Spesialis by ID: " + error.message, error.result || error, error.code || 400);
        }
    })
});

router.delete('/:id', jwtAuth, check_status, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Data Spesialis by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Data Spesialis by ID: " + error.message, error, 400);
        }
    })
});


module.exports = router;