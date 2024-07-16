const { check } = require('express-validator');

const create = [
    check('nama_kategori_obat')
        .isString().withMessage('Nama Kategori Obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama Kategori Obat tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama Kategori Obat tidak boleh lebih dari 255 karakter'),
    check('deskripsi')
        .isString().withMessage('Deskripsi spesialis harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Deskripsi spesialis tidak boleh kosong'),
];
  
const update = [
    check('nama_kategori_obat')
        .optional()
        .isString().withMessage('Nama Kategori Obat harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama Kategori Obat tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama Kategori Obat tidak boleh lebih dari 255 karakter'),
    check('deskripsi')
        .optional()
        .isString().withMessage('Deskripsi spesialis harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Deskripsi spesialis tidak boleh kosong'),
];

module.exports = {
    create, update
};
