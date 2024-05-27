const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Validator = require(appDir + '/validation/quotes/validator');
const query = require('./crud');
const { upload }  = require(appDir + '/lib/multer')
const jwtAuth = require(appDir + '/middleware/jwtAuth');
const { OpenAI } = require('openai');
const check_status = require(appDir + '/middleware/check_status');

const openai = new OpenAI({ apiKey: process.env.API_KEY });

router.post('/', jwtAuth, check_status, upload.single('image'), Validator.create, async (req, res, next) => {
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
            Responser.success(res, "Create Quote Successfully", data, 201);
          }else{
            Responser.error(res, "Error Creating Quote: " + error.message, error, 400);
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

        Responser.success(res, "Generated Quote Successfully", { generated_quote: quote.message.content }, 200);
    } catch (error) {
        Responser.error(res, "Error Generating Quote: " + error.message, error, 400);
    }
});

router.get('/', async (req, res, next) => {
    await query.findAll(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Quotes Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Quotes: " + error.message, error, 400);
        }
    })
});

router.get('/:id', async (req, res, next) => {
    await query.findOne(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Get Quote by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Get Quote by ID: " + error.message, error.result || error, error.code || 400);
        }
    })
});

router.patch('/:id', jwtAuth, check_status, upload.single('image'), Validator.update, async (req, res, next) => {
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
            Responser.success(res, "Update Quote by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Update Quote by ID: " + error.message, error.result || error, error.code || 400);
        }
    })
});

router.delete('/:id', jwtAuth, check_status, async (req, res, next) => {
    await query.destroy(req, res, (data, error) => {
        if(!error){
            Responser.success(res, "Delete Quote by ID Successfully", data, 200);
          }else{
            Responser.error(res, "Error Deleting Quote by ID: " + error.message, error, 400);
        }
    })
});


module.exports = router;