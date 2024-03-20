const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body
        const imagePath = req.file ? req.file.path : null

        const doc = await db.Berita.create({
            title: data.title,
            content: data.content,
            image_url: imagePath,
            kategori: data.kategori,
            doi_link: data.doi_link
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
            return
        }

        const error = new Error('Create Berita failed');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findAll = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;

        var options = {
            page: page < 1 ? 1 : page,
            paginate: per_page,
            order: [['id', 'desc']],
        };

        const { docs, pages, total } = await db.Blog.paginate(options);

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

        const error = new Error('There is no Blog data');
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

        const doc = await db.Berita.findOne(options);

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

        const error = new Error('Berita not found');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findMultiple = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;
        const req_kategori = req.params.kategori

        var options = {
            where: {kategori: req_kategori},
            page: page < 1 ? 1 : page,
            paginate: per_page,
            order: [['id', 'desc']],
        };

        const { docs, pages, total } = await db.Berita.paginate(options);

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

        const error = new Error('Berita with ' + req_kategori + ' category was not found');
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

        const doc = await db.Berita.findByPk(req.params.id);

        if (!doc) {
            const error = new Error('Berita not found');
            throw error;
        }

        if (data.title) doc.title = data.title;
        if (data.content) doc.content = data.content;
        if (imagePath){
            if (doc.image_url) {
                // Delete the record image or static asset from server
                const uniqueString = doc.image_url.split('\\').pop();
                const imagePath = path.join(appDir, 'uploads', uniqueString);
    
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            doc.image_url = imagePath;
        } 
        if (data.kategori) doc.kategori = data.kategori;
        if (data.doi_link) doc.doi_link = data.doi_link;

        await doc.save();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const destroy = async (req, res, callback) => {
    try {
        const id = req.params.id

        const doc = await db.Berita.findByPk(id);

        if (!doc) {
            const error = new Error('Berita not found');
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

module.exports = { findAll, findOne, findMultiple, create, update, destroy };
