const fs = require('fs');
const path = require('path');

const create = async (req, res, callback) => {
    try {
        const data = req.body;
        const userID = req.userID;
        const blogID = req.params.blogID;

        const blog = await db.Blog.findByPk(blogID);
        if (!blog) {
            const error = new Error(`Blog with ID ${blogID} not found`);
            throw error;
        }

        const doc = await db.BlogComment.create({
            blog_id: blogID,
            user_id: userID,
            user_name: data.user_name,
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
            return;
        }

        const error = new Error('Create Blog Comment failed');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
};

const findByBlogID = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;
        const blogID = req.params.blogID

        var options = {
            where: {blog_id: blogID},
            page: page < 1 ? 1 : page,
            paginate: per_page,
            order: [['id', 'desc']],
        };

        const { docs, pages, total } = await db.BlogComment.paginate(options);

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

        const error = new Error('Comments with with blog id {' + blogID + '} was not found');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const destroy = async (req, res, callback) => {
    try {
        const id = req.params.id

        const doc = await db.BlogComment.findByPk(id);

        if (!doc) {
            const error = new Error('Blog Comment not found');
            throw error;
        }
        
        await doc.destroy();

        callback(doc, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

module.exports = { findByBlogID, create, destroy };
