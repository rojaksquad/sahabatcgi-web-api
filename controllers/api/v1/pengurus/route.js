const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/pengurus/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuth = require(appDir + '/middleware/jwtAuthPengurus');
const check_status = require(appDir + '/middleware/check_status');

router.post('/login', upload.none(), Validator.login, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.login(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Login Success", data, 200);
          }else{
            Responser.error(res, "Error Login: " + error.message, error, 400);
        }
    })

});

router.post('/create', jwtAuth, check_status, upload.none(), Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.create(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Create New Pengurus Success", data, 200);
          }else{
            Responser.error(res, "Error Creating New Pengurus: " + error.message, error, 400);
        }
    })

});


router.get('/', jwtAuth, async (req, res, next) => {
    await query.findAll(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get All Pengurus Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get All Pengurus: " + error.message, error, 400);
        }
    })
});

router.get('/:id', jwtAuth, async (req, res, next) => {
    await query.findOne(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Pengurus by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Pengurus by ID: " + error.message, {}, 400);
        }
    })
});

router.patch('/:id', jwtAuth, upload.none(), Validator.update, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.update(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Update Admin by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Update Admin by ID: " + error.message, {}, 400);
        }
    })
});

router.delete('/:id', jwtAuth, check_status, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Admin by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Admin by ID: " + error.message, {}, 400);
        }
    })
});

module.exports = router