const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/blog/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuthUser = require(appDir + '/middleware/jwtAuthUser');
const jwtAuth = require(appDir + '/middleware/jwtAuth');
const { OpenAI } = require('openai');
const check_status = require(appDir + '/middleware/check_status');

const openai = new OpenAI({ apiKey: process.env.API_KEY });

router.post('/', jwtAuthUser, upload.none(), Validator.create, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.create(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Create Blog Successfully", data, 201);
          }else{
            Responser.error(res, "Error Creating Blog: " + error.message, error, 400);
        }
    })
});

router.post('/generate', jwtAuth, check_status, upload.none(), Validator.generate, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return;
    }

    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        const quote = completion.choices[0]

        Responser.success(res, "Generated Blog Successfully", { generated_blog: quote.message.content }, 200);
    } catch (error) {
        Responser.error(res, "Error Generating Blog: " + error.message, error, 400);
    }
});

router.get('/', async (req, res, next) => {
    await query.findAll(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Blog Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Blog: " + error.message, error, 400);
        }
    })
});

router.get('/:id', async (req, res, next) => {
    await query.findOne(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Blog by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Blog by ID: " + error.message, error, 400);
        }
    })
});

router.get('/user/id', jwtAuthUser, async (req, res, next) => {
    await query.findByUserID(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Blog by User ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Blog by User ID: " + error.message, error, 400);
        }
    })
});

router.patch('/:id', jwtAuth, check_status, upload.none(), Validator.update, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Responser.error(res, "Error Data Request", errors.array(), 400);
        return
    }

    await query.update(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Update Blog by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Update Blog by ID: " + error.message, error, 400);
        }
    })
});

router.delete('/:id', jwtAuth, check_status, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Blog by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Blog by ID: " + error.message, error, 400);
        }
    })
});


module.exports = router;