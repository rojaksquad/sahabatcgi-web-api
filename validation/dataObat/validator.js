const { check } = require('express-validator');

const create = [
    check('nama_obat')
        .isString().withMessage('Nama Obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama Obat tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama Obat tidak boleh lebih dari 255 karakter'),
    check('list_dosis')
        .isString().withMessage('List Dosis Obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('List Dosis Obat tidak boleh kosong'),
    check('kategori')
        .isString().withMessage('Kategori obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Kategori obat tidak boleh kosong'),
];
  
const update = [
    check('nama_obat')
        .optional()
        .isString().withMessage('Nama Obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama Obat tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama Obat tidak boleh lebih dari 255 karakter'),
    check('list_dosis')
        .optional()
        .isString().withMessage('List Dosis Obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('List Dosis Obat tidak boleh kosong'),
    check('kategori')
        .optional()
        .isString().withMessage('Kategori obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Kategori obat tidak boleh kosong'),
];

module.exports = {
    create, update
};
