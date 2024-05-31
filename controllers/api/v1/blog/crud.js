const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body
        const userID = req.userID

        const doc = await db.Blog.create({
            author_id: userID,
            author_name: data.author_name,
            title: data.title,
            content: data.content,
            isVerified: false,
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

        const error = new Error('Create Blog failed');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findAll = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 100000;
        const isVerified = req.query.isVerified;

        var options = {
            page: page < 1 ? 1 : page,
            paginate: per_page,
            order: [['id', 'desc']],
            where: {}
        };

        if (isVerified !== undefined && ['true', 'false'].includes(isVerified.toLowerCase())) {
            options.where.isVerified = isVerified.toLowerCase() === 'true';
        }

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
            return;
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

        const doc = await db.Blog.findOne(options);

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

        const error = new Error('Blog not found');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findByUserID = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;
        const userID = req.userID

        var options = {
            where: {author_id: userID},
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

        const error = new Error('Blog with user id {' + userID + '} was not found');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const update = async (req, res, callback) => {
    try {
        const data = req.body;

        const doc = await db.Blog.findByPk(req.params.id);

        if (!doc) {
            const error = new Error('Blog not found');
            throw error;
        }

        if (data.title) doc.title = data.title;
        if (data.content) doc.content = data.content;
        if (data.isVerified !== undefined) {
            doc.isVerified = data.isVerified === 'true';
        }

        await doc.save();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const destroy = async (req, res, callback) => {
    try {
        const id = req.params.id;

        const doc = await db.Blog.findByPk(id);

        if (!doc) {
            const error = new Error('Blog not found');
            throw error;
        }

        await doc.destroy();

        await db.BlogComment.destroy({ where: { blog_id: id } });

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
};


module.exports = { findAll, findOne, findByUserID, create, update, destroy };
