const { check } = require('express-validator');

const login = [
    check('email').isString().withMessage('Email harus ber-tipe data String').isLength({ min: 1 }).withMessage('Email tidak boleh kosong').isEmail().withMessage('Format email tidak valid')
];
  
const create = [
    check('email').isString().withMessage('Email harus ber-tipe data String').isLength({ min: 1 }).withMessage('Email tidak boleh kosong').isEmail().withMessage('Format email tidak valid'),
    check('full_name').isString().withMessage('Full Name harus ber-tipe data String').isLength({ min: 1 }).withMessage('Full Name tidak boleh kosong'),
    check('password').isLength({ min: 8 }).withMessage('Password harus memiliki minimal 8 karakter').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/).withMessage('Password harus mengandung setidaknya satu angka dan satu karakter spesial')
];

const update = [
    check('email').optional().isString().withMessage('Email harus ber-tipe data String').isLength({ min: 1 }).withMessage('Email tidak boleh kosong').isEmail().withMessage('Format email tidak valid'),
    check('full_name').optional().isString().withMessage('Full Name harus ber-tipe data String').isLength({ min: 1 }).withMessage('Full Name tidak boleh kosong'),
    check('is_active').optional().custom((value) => {
        if (typeof value === 'string' && ['true', 'false'].includes(value.toLowerCase())) {
            return true;
        } else {
            throw new Error('Is_active harus berupa string "true" atau "false"');
        }
    }),
    check('password').optional().isLength({ min: 8 }).withMessage('Password harus memiliki minimal 8 karakter').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/).withMessage('Password harus mengandung setidaknya satu angka dan satu karakter spesial'),
];

module.exports = {
    login, create, update
};
