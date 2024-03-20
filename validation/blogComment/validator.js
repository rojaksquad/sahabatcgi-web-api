const { check } = require('express-validator');

const create = [
    check('user_name').isString().withMessage('User name harus ber-tipe data String').isLength({ min: 1 }).withMessage('User name tidak boleh kosong').isLength({ max: 255 }).withMessage('User name boleh lebih dari 255 karakter'),
    check('content').isString().withMessage('Content harus ber-tipe data String').isLength({ min: 1 }).withMessage('Content tidak boleh kosong'),
];

module.exports = {
    create
};