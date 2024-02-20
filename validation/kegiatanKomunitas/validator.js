const { check } = require('express-validator');

const create = [
    check('name').isNumeric().withMessage('Name harus numeric').isLength({ min: 1 }).withMessage('Name tidak boleh kosong'),
    // check('title').isLength({ min: 1 }).withMessage('Tidak boleh kosong').isLength({ max: 40 }).withMessage('Tidak boleh lebih dari 40 karakter')
  ];
  

module.exports = {
    create
};