const { check } = require('express-validator');

const create = [
    check('nama_rs')
        .isString().withMessage('Nama RS harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama RS tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama RS tidak boleh lebih dari 255 karakter'),
    check('lokasi_rs')
        .isString().withMessage('Lokasi RS harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Lokasi RS tidak boleh kosong'),
    check('link_maps')
        .isLength({ min: 1 }).withMessage('Link Maps tidak boleh kosong')
        .custom((value) => {
            const pattern = /^https:\/\/maps\.app\.goo\.gl\//;
            if (!pattern.test(value)) {
                throw new Error('Link Maps harus dimulai dengan "https://maps.app.goo.gl/"');
            }
            return true;
        }),
        check('latlong')
        .isString().withMessage('LatLong harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('LatLong tidak boleh kosong')
        .custom((value) => {
            const pattern = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/; // Matches any latitude and longitude format
            if (!pattern.test(value)) {
                throw new Error('Format LatLong tidak valid. Contoh format: "-7.273972474606401, 112.74648084651307"');
            }
            return true;
        }),
    check('info_kontak')
        .isString().withMessage('Info Kontak harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Info Kontak tidak boleh kosong')
];
  
const update = [
    check('nama_rs')
        .optional()
        .isString().withMessage('Nama RS harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Nama RS tidak boleh kosong')
        .isLength({ max: 255 }).withMessage('Nama RS tidak boleh lebih dari 255 karakter'),
    check('lokasi_rs')
        .optional()
        .isString().withMessage('Lokasi RS harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Lokasi RS tidak boleh kosong'),
    check('link_maps')
        .optional()
        .isString().withMessage('Link Maps harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('Link Maps tidak boleh kosong')
        .custom((value) => {
            const pattern = /^https:\/\/maps\.app\.goo\.gl\//;
            if (!pattern.test(value)) {
                throw new Error('Link Maps harus dimulai dengan "https://maps.app.goo.gl/"');
            }
            return true;
        }),
    check('latlong')
        .optional()
        .isString().withMessage('LatLong harus ber-tipe data String')
        .isLength({ min: 1 }).withMessage('LatLong tidak boleh kosong')
        .custom((value) => {
            const pattern = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/; // Matches any latitude and longitude format
            if (!pattern.test(value)) {
                throw new Error('Format LatLong tidak valid. Contoh format: "-7.264986287053687, 112.75588937592103"');
            }
            return true;
    }),
];

module.exports = {
    create, update
};
