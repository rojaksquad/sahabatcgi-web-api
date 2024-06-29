const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body;

        const existingRecord = await db.DataSpesialis.findOne({ where: { nama_spesialis: data.nama_spesialis } });
        if (existingRecord) {
            throw new Error('Data Spesialis already exists');
        }

        const doc = await db.DataSpesialis.create({
            nama_spesialis: data.nama_spesialis,
            deskripsi: data.deskripsi,
        });

        if (doc) {
            let result = {
                data: await doc,
                currentPage: 1,
                nextPage: false,
                totalItems: 1,
                totalPages: 1,
            };

            callback(result, '');
            return;
        }

        const error = new Error('Create Data Spesialis failed');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
};


const findAll = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 100000;

        var options = {
            page: page < 1 ? 1 : page,
            paginate: per_page,
            order: [['id', 'desc']],
        };

        const { docs, pages, total } = await db.DataSpesialis.paginate(options);

        if (docs) {
            let result = {
                data: await docs,
                currentPage: page,
                nextPage: page >= pages ? false : page + 1,
                totalItems: total,
                totalPages: pages,
            };

            callback(result, '');
            return
        }

        const error = new Error('There is no Data Spesialis data');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findOne = async (req, res, callback) => {
    try {
        var options = {
            where: { id: req.params.id }
        };

        const doc = await db.DataSpesialis.findOne(options);

        if (doc) {
            let result = {
                data: await doc,
                currentPage: 1,
                nextPage: false,
                totalItems: 1,
                totalPages: 1,
            };

            callback(result, '');
            return
        }
        
        const error = new Error('Data Spesialis not found');
        error.code = 404;
        error.result = {}
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const update = async (req, res, callback) => {
    try {
        const data = req.body;
        const imagePath = req.file ? req.file.path : null;

        const doc = await db.DataSpesialis.findByPk(req.params.id);

        if (!doc) {
            if (imagePath && fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            const error = new Error('Data Spesialis not found');
            error.code = 404;
            error.result = {};
            throw error;
        }

        if (data.nama_spesialis && data.nama_spesialis !== doc.nama_spesialis) {
            const existingRecordWithSameNamaRS = await db.DataSpesialis.findOne({ where: { nama_spesialis: data.nama_spesialis } });

            if (existingRecordWithSameNamaRS) {
                if (imagePath && fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                const error = new Error('Data Spesialis already exists');
                error.code = 400;
                error.result = {};
                throw error;
            }
        }

        if (data.nama_spesialis) doc.nama_spesialis = data.nama_spesialis;
        if (data.deskripsi) doc.deskripsi = data.deskripsi;
        if (imagePath) {
            if (doc.image_url) {
                const uniqueString = doc.image_url.split('\\').pop();
                const existingImagePath = path.join(appDir, 'uploads', uniqueString);
                if (fs.existsSync(existingImagePath)) {
                    fs.unlinkSync(existingImagePath);
                }
            }
            doc.image_url = imagePath;
        }
        if (data.link_maps) doc.link_maps = data.link_maps;
        if (data.latlong) doc.latlong = data.latlong;
        if (data.info_kontak) doc.info_kontak = data.info_kontak;

        await doc.save();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
};

const destroy = async (req, res, callback) => {
    try {
        const id = req.params.id

        const doc = await db.DataSpesialis.findByPk(id);

        if (!doc) {
            const error = new Error('Data Spesialis not found');
            throw error;
        }

        if (doc.image_url) {
            // Delete the record image or static asset from server
            const uniqueString = doc.image_url.split('\\').pop();
            const imagePath = path.join(appDir, 'uploads', uniqueString);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await doc.destroy();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

module.exports = { findAll, findOne, create, update, destroy };
