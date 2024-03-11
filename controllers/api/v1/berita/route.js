const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/berita/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuth = require(appDir + '/middleware/jwtAuth');

router.post('/', jwtAuth, upload.single('image'), Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    if (req.file === 'invalid_file_type') {
        Responser.error(res, req.fileValidationError, {}, 400);
        return;
    }

    await query.create(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Create Berita Successfully", data, 201);
          }else{
            Responser.error(res, "Error Creating Berita: " + error.message, error, 400);
        }
    })
});

router.get('/', async (req, res, next) => {
    await query.findAll(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Berita Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Berita: " + error.message, error, 400);
        }
    })
});

router.get('/:id', async (req, res, next) => {
    await query.findOne(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Berita by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Berita by ID: " + error.message, error, 400);
        }
    })
});

router.get('/kategori/:kategori', async (req, res, next) => {
    await query.findMultiple(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Berita by Kategori Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Berita by Kategori: " + error.message, error, 400);
        }
    })
});

router.patch('/:id', jwtAuth, upload.single('image'), Validator.update, async (req, res, next) => {
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
            Responser.success(res, "Update Berita by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Update Berita by ID: " + error.message, error, 400);
        }
    })
});

router.delete('/:id', jwtAuth, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Berita by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Berita by ID: " + error.message, error, 400);
        }
    })
});


module.exports = router;