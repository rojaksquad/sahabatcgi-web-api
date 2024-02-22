const { check } = require('express-validator');

const create = [
    check('title').isString().withMessage('Title harus ber-tipe data String').isLength({ min: 1 }).withMessage('Title tidak boleh kosong').isLength({ max: 255 }).withMessage('Tidak boleh lebih dari 255 karakter'),
    check('content').isString().withMessage('Content harus ber-tipe data String').isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
    check('date').isLength({ min: 1 }).withMessage('Date tidak boleh kosong'),
];
  
const update = [
    check('title').optional().isString().withMessage('Title harus ber-tipe data String').isLength({ min: 1 }).withMessage('Title tidak boleh kosong').isLength({ max: 255 }).withMessage('Tidak boleh lebih dari 255 karakter'),
    check('content').optional().isString().withMessage('Content harus ber-tipe data String').isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
    check('date').optional().isLength({ min: 1 }).withMessage('Date tidak boleh kosong'),
];

module.exports = {
    create, update
};