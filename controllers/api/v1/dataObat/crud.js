const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body;

        const existingRecord = await db.DataObat.findOne({ where: { nama_obat: data.nama_obat } });
        if (existingRecord) {
            throw new Error('Data Obat already exists');
        }

        const doc = await db.DataObat.create({
            nama_obat: data.nama_obat,
            list_dosis: data.list_dosis,
            kategori: data.kategori,
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

        const error = new Error('Create Data Obat failed');
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

        const { docs, pages, total } = await db.DataObat.paginate(options);

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

        const error = new Error('There is no Data Obat data');
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

        const doc = await db.DataObat.findOne(options);

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
        
        const error = new Error('Data Obat not found');
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

        const doc = await db.DataObat.findByPk(req.params.id);

        if (!doc) {
            if (imagePath && fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            const error = new Error('Data Obat not found');
            error.code = 404;
            error.result = {};
            throw error;
        }

        if (data.nama_obat && data.nama_obat !== doc.nama_obat) {
            const existingRecordWithSameNamaRS = await db.DataObat.findOne({ where: { nama_obat: data.nama_obat } });

            if (existingRecordWithSameNamaRS) {
                if (imagePath && fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                const error = new Error('Data Obat already exists');
                error.code = 400;
                error.result = {};
                throw error;
            }
        }

        if (data.nama_obat) doc.nama_obat = data.nama_obat;
        if (data.list_dosis) doc.list_dosis = data.list_dosis;
        if (data.kategori) doc.kategori = data.kategori;

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

        const doc = await db.DataObat.findByPk(id);

        if (!doc) {
            const error = new Error('Data Obat not found');
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
