const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/blogComment/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuthUser = require(appDir + '/middleware/jwtAuthUser');
const jwtAuth = require(appDir + '/middleware/jwtAuth');
const check_status = require(appDir + '/middleware/check_status');

router.post('/:blogID', jwtAuthUser, upload.none(), Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.create(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Create Blog Comment Successfully", data, 201);
          }else{
            Responser.error(res, "Error Creating Blog Comment: " + error.message, error, 400);
        }
    })
});

router.get('/:blogID', async (req, res, next) => {
    await query.findByBlogID(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Comments by Blog ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Comments by Blog ID: " + error.message, error, 400);
        }
    })
});

router.delete('/:id', jwtAuth, check_status, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Blog Comment by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Blog Comment by ID: " + error.message, error, 400);
        }
    })
});


module.exports = router;