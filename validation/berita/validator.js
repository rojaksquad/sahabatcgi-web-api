const { check } = require('express-validator');

const create = [
    check('title').isString().withMessage('Title harus ber-tipe data String').isLength({ min: 1 }).withMessage('Title tidak boleh kosong').isLength({ max: 255 }).withMessage('Tidak boleh lebih dari 255 karakter'),
    check('content').isString().withMessage('Content harus ber-tipe data String').isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
    check('kategori').isLength({ min: 1 }).withMessage('Kategori tidak boleh kosong'),
    check('kategori').isIn(['perkembanganKomunitas', 'perkembanganCML']).withMessage('Kategori harus menjadi salah satu dari "perkembanganKomunitas" atau "perkembanganCML"'),
];
  
const update = [
    check('title').optional().isString().withMessage('Title harus ber-tipe data String').isLength({ min: 1 }).withMessage('Title tidak boleh kosong').isLength({ max: 255 }).withMessage('Tidak boleh lebih dari 255 karakter'),
    check('content').optional().isString().withMessage('Content harus ber-tipe data String').isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
    check('kategori').optional().isLength({ min: 1 }).withMessage('Kategori tidak boleh kosong'),
    check('kategori').optional().isIn(['perkembanganKomunitas', 'perkembanganCML']).withMessage('Kategori harus menjadi salah satu dari "perkembanganKomunitas" atau "perkembanganCML"'),
];

module.exports = {
    create, update
};