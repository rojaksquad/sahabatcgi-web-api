const { check } = require('express-validator');

const create = [
    check('author_name').isString().withMessage('Author Name harus ber-tipe data String').isLength({ min: 1 }).withMessage('Author Name tidak boleh kosong').isLength({ max: 255 }).withMessage('Author Name tidak boleh lebih dari 255 karakter'),
    check('quote').isLength({ min: 1 }).withMessage('Quote tidak boleh kosong'),
];
  
const update = [
    check('author_name').optional().isString().withMessage('Author Name harus ber-tipe data String').isLength({ min: 1 }).withMessage('Author Name tidak boleh kosong').isLength({ max: 255 }).withMessage('Author Name tidak boleh lebih dari 255 karakter'),
    check('quote').optional().isLength({ min: 1 }).withMessage('Quote tidak boleh kosong'),
];

const generate = [
    check('prompt').isString().withMessage('Prompt harus ber-tipe data String').isLength({ min: 1 }).withMessage('Prompt tidak boleh kosong'),
];

module.exports = {
    create, update, generate
};