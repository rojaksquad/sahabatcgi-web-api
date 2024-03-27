const { check } = require('express-validator');

const login = [
    check('username')
        .isString().withMessage('Username harus ber-tipe data String')
        .isLength({ min: 6, max: 16 }).withMessage('Username harus memiliki panjang antara 6 dan 16 karakter')
        .custom(value => {
            if (value.includes(' ')) {
                throw new Error('Username tidak boleh mengandung spasi');
            }
            if (/[A-Z]/.test(value)) {
                throw new Error('Username tidak boleh mengandung huruf kapital');
            }
            if (/[^a-zA-Z0-9_]/.test(value)) {
                throw new Error('Username hanya boleh mengandung huruf kecil, angka, dan garis bawah (_)');
            }
            return true;
        })
];

const create = [
    check('username')
        .isString().withMessage('Username harus ber-tipe data String')
        .isLength({ min: 6, max: 16 }).withMessage('Username harus memiliki panjang antara 6 dan 16 karakter')
        .custom(value => {
            if (value.includes(' ')) {
                throw new Error('Username tidak boleh mengandung spasi');
            }
            if (/[A-Z]/.test(value)) {
                throw new Error('Username tidak boleh mengandung huruf kapital');
            }
            if (/[^a-zA-Z0-9_]/.test(value)) {
                throw new Error('Username hanya boleh mengandung huruf kecil, angka, dan garis bawah (_)');
            }
            return true;
        }),
    check('full_name')
        .isString().withMessage('Full Name harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Full Name tidak boleh kosong'),
    check('password')
        .isLength({ min: 8 }).withMessage('Password harus memiliki minimal 8 karakter')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
        .withMessage('Password harus mengandung setidaknya satu angka dan satu karakter spesial'),
    check('superAdmin')
        .exists().withMessage('Role superAdmin harus ada')
        .isBoolean().withMessage('Value superAdmin harus memiliki nilai boolean (true / false)')
];

const update = [
    check('username')
        .optional()
        .isString().withMessage('Username harus ber-tipe data String')
        .isLength({ min: 6, max: 16 }).withMessage('Username harus memiliki panjang antara 6 dan 16 karakter')
        .custom(value => {
            if (value.includes(' ')) {
                throw new Error('Username tidak boleh mengandung spasi');
            }
            if (/[A-Z]/.test(value)) {
                throw new Error('Username tidak boleh mengandung huruf kapital');
            }
            if (/[^a-zA-Z0-9_]/.test(value)) {
                throw new Error('Username hanya boleh mengandung huruf kecil, angka, dan garis bawah (_)');
            }
            return true;
        }),
    check('full_name')
        .optional()
        .isString().withMessage('Full Name harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Full Name tidak boleh kosong'),
    check('is_active')
        .optional()
        .custom((value) => {
            if (typeof value === 'string' && ['true', 'false'].includes(value.toLowerCase())) {
                return true;
            } else {
                throw new Error('Is_active harus berupa string "true" atau "false"');
            }
        }),
    check('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Password harus memiliki minimal 8 karakter')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
        .withMessage('Password harus mengandung setidaknya satu angka dan satu karakter spesial'),
];

module.exports = {
    login, create, update
};
