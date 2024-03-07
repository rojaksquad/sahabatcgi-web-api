const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body
        const imagePath = req.file ? req.file.path : null

        const existingProfil = await db.Donasi.findOne();

        if (!existingProfil) {
            const doc = await db.Donasi.create({
                title: data.title,
                image_url: imagePath,
                content: data.content,
                donate_link: data.donate_link,
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
            const error = new Error('Create Info Donasi failed');
            throw error;
        }
        
        const error = new Error('Only one Info Donasi can exists at the same time');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findOne = async (req, res, callback) => {
    try {
        const doc = await db.Donasi.findOne();

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

        const error = new Error('There is no Donasi data');
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

        const doc = await db.Donasi.findOne();

        if (!doc) {
            const error = new Error('There is no Info Donasi data');
            throw error;
        }

        if (data.title) doc.title = data.title;
        if (data.content) doc.content = data.content;
        if (imagePath) doc.image_url = imagePath;
        if (data.donate_link) doc.donate_link = data.donate_link;


        await doc.save();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const destroy = async (req, res, callback) => {
    try {

        const doc = await db.Donasi.findOne();

        if (!doc) {
            const error = new Error('There is no Info Donasi data');
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

module.exports = { findOne, create, update, destroy };
