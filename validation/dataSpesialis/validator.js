const { check } = require('express-validator');

const create = [
    check('nama_spesialis')
        .isString().withMessage('Nama Spesialis harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama Spesialis tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama Spesialis tidak boleh lebih dari 255 karakter'),
    check('deskripsi')
        .isString().withMessage('Deskripsi spesialis harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Deskripsi spesialis tidak boleh kosong'),
];
  
const update = [
    check('nama_spesialis')
        .optional()
        .isString().withMessage('Nama Spesialis harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama Spesialis tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama Spesialis tidak boleh lebih dari 255 karakter'),
    check('deskripsi')
        .optional()
        .isString().withMessage('Deskripsi spesialis harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Deskripsi spesialis tidak boleh kosong'),
];

module.exports = {
    create, update
};
