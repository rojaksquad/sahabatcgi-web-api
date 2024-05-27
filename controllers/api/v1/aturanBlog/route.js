const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/aturanBlog/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuth = require(appDir + '/middleware/jwtAuth');
const check_status = require(appDir + '/middleware/check_status');

router.post('/', jwtAuth, check_status, upload.none(), Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.create(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Create Aturan Blog Successfully", data, 201);
          }else{
            Responser.error(res, "Error Creating Aturan Blog: " + error.message, error, 400);
        }
    })
});

router.get('/', async (req, res, next) => {
    await query.findOne(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Aturan Blog Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Aturan Blog: " + error.message, error, 400);
        }
    })
});

router.patch('/', jwtAuth, check_status, upload.none(), Validator.update, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.update(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Update Aturan Blog Successfully", data, 200);
          }else{
            Responser.error(res, "Error Update Aturan Blog: " + error.message, error, 400);
        }
    })
});

router.delete('/', jwtAuth, check_status, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Aturan Blog Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Aturan Blog: " + error.message, error, 400);
        }
    })
});


module.exports = router;