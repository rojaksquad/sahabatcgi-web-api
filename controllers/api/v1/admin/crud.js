const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, callback) => {
    const { email, password } = req.body;

    try {
        const user = await db.Admin.findOne({ where: { email } });

        if (!user) {
            const error = new Error('User not found');
            throw error;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password credentials');
            throw error;
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                is_active: user.is_active,
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '6h' },
            (err, token) => {
                if (err) throw err;
                callback({
                    user: payload.user,
                    token: token
                }, '');
            }
        );
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}


const create = async (req, res, callback) => {
    try {
        const data = req.body;

        const existingAdmin = await db.Admin.findOne({ where: { email: data.email } });
        if (existingAdmin) {
            const error = new Error('Email already exists');
            throw error;
        }

        const saltRounds = 10;
        const plainPassword = data.password;
        const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

        const doc = await db.Admin.create({
            email: data.email,
            password: hashedPassword,
            full_name: data.full_name,
            is_active: true,
        });

        if (doc) {
            const result = {
                data: {
                    id: doc.id,
                    email: doc.email,
                    full_name: doc.full_name,
                    is_active: doc.is_active,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt
                },
                currentPage: 1,
                nextPage: false,
                totalItems: 1,
                totalPages: 1,
            };

            callback(result, '');
            return;
        }

        const error = new Error('Create New Admin failed');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
};


const findAll = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;

        var options = {
            page: page < 1 ? 1 : page,
            paginate: per_page,
            order: [['id', 'desc']],
            attributes: { exclude: ['password'] }
        };

        const { docs, pages, total } = await db.Admin.paginate(options);

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

        const error = new Error('There is no Admin data');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const findOne = async (req, res, callback) => {
    try {
        var options = {
            where: { id: req.params.id },
            attributes: { exclude: ['password'] }
        };

        const doc = await db.Admin.findOne(options);

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
        
        const error = new Error('Admin not found');
        throw error;
    } catch (error) {
        console.log(error);
        callback('', error);
    }
}

const update = async (req, res, callback) => {
    try {
        const data = req.body;

        const doc = await db.Admin.findByPk(req.params.id);

        if (!doc) {
            const error = new Error('Admin not found');
            throw error;
        }

        if (data.email) {
            const existingAdmin = await db.Admin.findOne({ where: { email: data.email } });
            if (existingAdmin && existingAdmin.id !== doc.id) {
                const error = new Error('Email already exists');
                throw error;
            }
        }

        if (data.email) doc.email = data.email;
        if (data.full_name) doc.full_name = data.full_name;
        if (data.is_active) {
            doc.is_active = data.is_active === 'true';
        }

        await doc.save();

        const result = {
            id: doc.id,
            email: doc.email,
            full_name: doc.full_name,
            is_active: doc.is_active,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };

        callback(result, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
};



const destroy = async (req, res, callback) => {
    try {
        const id = req.params.id;

        const doc = await db.Admin.findByPk(id);

        if (!doc) {
            const error = new Error('Admin not found');
            throw error;
        }

        const result = {
            id: doc.id,
            email: doc.email,
            full_name: doc.full_name,
            is_active: doc.is_active,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };

        await doc.destroy();

        callback(result, '');
    } catch (error) {
        console.log(error);
        callback('', error);
    }
};


module.exports = { login, findAll, findOne, create, update, destroy };
