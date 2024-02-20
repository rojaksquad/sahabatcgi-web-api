const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/kegiatanKomunitas/validator');
const query = require('./crud');

router.get('/', Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    query.findAll(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Users Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Users: " + error.message, error, 400);
        }
    })
});

module.exports = router;