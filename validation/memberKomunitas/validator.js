const { check } = require('express-validator');

const create = [
    check('full_name').isString().withMessage('Full Name harus ber-tipe data String').isLength({ min: 1 }).withMessage('Full Name tidak boleh kosong').isLength({ max: 255 }).withMessage('Full Name tidak boleh lebih dari 255 karakter'),
    check('jabatan').isString().withMessage('Jabatan harus ber-tipe data String').isLength({ min: 1 }).withMessage('Jabatan tidak boleh kosong'),
    check('quote').isLength({ min: 1 }).withMessage('Quote tidak boleh kosong'),
];
  
const update = [
    check('full_name').optional().isString().withMessage('Full Name harus ber-tipe data String').isLength({ min: 1 }).withMessage('Full Name tidak boleh kosong').isLength({ max: 255 }).withMessage('Full Name tidak boleh lebih dari 255 karakter'),
    check('jabatan').optional().isString().withMessage('Jabatan harus ber-tipe data String').isLength({ min: 1 }).withMessage('Jabatan tidak boleh kosong'),
    check('quote').optional().isLength({ min: 1 }).withMessage('Quote tidak boleh kosong'),
];

module.exports = {
    create, update
};