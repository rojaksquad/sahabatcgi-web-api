const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body
        const imagePath = req.file ? req.file.path : null

        const existingProfil = await db.ProfilKomunitas.findOne();

        if (!existingProfil) {
            const doc = await db.ProfilKomunitas.create({
                title: data.title,
                content: data.content,
                visi: data.visi,
                misi: data.misi,
                image_url: imagePath,
                ig_link: data.ig_link,
                twitter_link: data.twitter_link,
                fb_link: data.fb_link
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
            const error = new Error('Create Profil Komunitas failed');
            throw error;
        }
        
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        const error = new Error('Only one Profil Komunitas can exists at the same time');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findOne = async (req, res, callback) => {
    try {
        const doc = await db.ProfilKomunitas.findOne();

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

        const error = new Error('There is no Profil Komunitas data');
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

        const doc = await db.ProfilKomunitas.findOne();

        if (!doc) {
            if (imagePath && fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            const error = new Error('There is no Profil Komunitas data');
            throw error;
        }

        if (data.title) doc.title = data.title;
        if (data.content) doc.content = data.content;
        if (data.visi) doc.visi = data.visi;
        if (data.misi) doc.misi = data.misi;
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
        if (data.ig_link) doc.ig_link = data.ig_link;
        if (data.twitter_link) doc.twitter_link = data.twitter_link;
        if (data.fb_link) doc.fb_link = data.fb_link;


        await doc.save();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const destroy = async (req, res, callback) => {
    try {

        const doc = await db.ProfilKomunitas.findOne();

        if (!doc) {
            const error = new Error('There is no Profil Komunitas data');
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
