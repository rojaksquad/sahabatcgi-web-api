const { check } = require('express-validator');

const create = [
    check('title')
        .isString().withMessage('Title harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Title tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Title tidak boleh lebih dari 255 karakter'),
    check('content')
        .isString().withMessage('Content harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
    check('visi')
        .isString().withMessage('Visi harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Visi tidak boleh kosong'),
    check('misi')
        .isString().withMessage('Misi harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Misi tidak boleh kosong'),
];
  
const update = [
    check('title')
        .optional()
        .isString().withMessage('Title harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Title tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Title tidak boleh lebih dari 255 karakter'),
    check('content')
        .optional()
        .isString().withMessage('Content harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
    check('visi')
        .optional()
        .isString().withMessage('Visi harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Visi tidak boleh kosong'),
    check('misi')
        .optional()
        .isString().withMessage('Misi harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Misi tidak boleh kosong'),
];

module.exports = {
    create, update
};
