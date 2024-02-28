const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body
        const existingAturan = await db.AturanBlog.findOne();

        if (!existingAturan) {
            const doc = await db.AturanBlog.create({
                title: data.title,
                content: data.content,
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
        }
        
        const error = new Error('Only one Aturan Blog can exists at the same time');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findOne = async (req, res, callback) => {
    try {
        const doc = await db.AturanBlog.findOne();

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

        const error = new Error('There is no Aturan Blog data');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const update = async (req, res, callback) => {
    try {
        const data = req.body;

        const doc = await db.AturanBlog.findOne();

        if (!doc) {
            const error = new Error('There is no Aturan Blog data');
            throw error;
        }

        if (data.title) doc.title = data.title;
        if (data.content) doc.content = data.content;

        await doc.save();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const destroy = async (req, res, callback) => {
    try {

        const doc = await db.AturanBlog.findOne();

        if (!doc) {
            const error = new Error('There is no Aturan Blog data');
            throw error;
        }
        
        await doc.destroy();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

module.exports = { findOne, create, update, destroy };
