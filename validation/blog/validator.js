const { check } = require('express-validator');

const create = [
    check('author_name').isString().withMessage('Author name harus ber-tipe data String').isLength({ min: 1 }).withMessage('Author name tidak boleh kosong').isLength({ max: 255 }).withMessage('Author name boleh lebih dari 255 karakter'),
    check('title').isString().withMessage('Title harus ber-tipe data String').isLength({ min: 1 }).withMessage('Title tidak boleh kosong').isLength({ max: 255 }).withMessage('Tidak boleh lebih dari 255 karakter'),
    check('content').isString().withMessage('Content harus ber-tipe data String').isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
];
  
const update = [
    check('title').optional().isString().withMessage('Title harus ber-tipe data String').isLength({ min: 1 }).withMessage('Title tidak boleh kosong').isLength({ max: 255 }).withMessage('Tidak boleh lebih dari 255 karakter'),
    check('content').optional().isString().withMessage('Content harus ber-tipe data String').isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
    check('isVerified').optional().custom((value) => {
        if (typeof value === 'string' && ['true', 'false'].includes(value.toLowerCase())) {
            return true;
        } else {
            throw new Error('isVerified harus berupa string "true" atau "false"');
        }
    }),
];

const generate = [
    check('prompt').isString().withMessage('Prompt harus ber-tipe data String').isLength({ min: 1 }).withMessage('Prompt tidak boleh kosong'),
];

module.exports = {
    create, update, generate
};