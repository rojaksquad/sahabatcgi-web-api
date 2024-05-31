const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, callback) => {
    const { username, password } = req.body;

    try {
        const user = await db.Pengurus.findOne({ where: { username } });

        if (!user) {
            const error = new Error('Pengurus not found');
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
                username: user.username,
                full_name: user.full_name,
                is_active: user.is_active,
                superUser: user.superUser
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET_PENGURUS,
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
        const user = req.user;
        
        if (!user.superUser) {
            const error = new Error('Unauthorized, Only superUser can create pengurus');
            throw error;
        }

        const data = req.body;

        const existingPengurus = await db.Pengurus.findOne({ where: { username: data.username } });
        if (existingPengurus) {
            const error = new Error('Username already exists');
            throw error;
        }

        const saltRounds = 10;
        const plainPassword = data.password;
        const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

        const doc = await db.Pengurus.create({
            username: data.username,
            password: hashedPassword,
            full_name: data.full_name,
            is_active: true,
            superUser: data.superUser
        });

        if (doc) {
            const result = {
                data: {
                    id: doc.id,
                    username: doc.username,
                    full_name: doc.full_name,
                    is_active: doc.is_active,
                    superUser: doc.superUser,
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

        const error = new Error('Create New Pengurus failed');
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
            attributes: { exclude: ['password'] }
        };

        const { docs, pages, total } = await db.Pengurus.paginate(options);

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

        const error = new Error('There is no Pengurus data');
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

        const doc = await db.Pengurus.findOne(options);

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
        
        const error = new Error('Pengurus not found');
        throw error;
    } catch (error) {
        if (error.message.includes('invalid input syntax for type uuid')) {
            error.message = 'Pengurus not found';
        }
        console.log(error);
        callback('', error);
    }
}

const update = async (req, res, callback) => {
    try {
        const user = req.user; 

        const data = req.body;

        const doc = await db.Pengurus.findByPk(req.params.id);

        if (!doc) {
            const error = new Error('Pengurus not found');
            throw error;
        }

        const isSuperUser = user.superUser;

        if (isSuperUser && doc.superUser && doc.id !== user.id) {
            const error = new Error('Unauthorized, superUsers cannot update other superUsers');
            throw error;
        }

        if (!isSuperUser && doc.id !== user.id) {
            const error = new Error('Unauthorized, Non-superUsers can only update their own profile');
            throw error;
        }

        if (doc.id === user.id && data.superUser !== undefined) {
            const error = new Error('Unauthorized, Pengurus cannot change their own superUser status');
            throw error;
        }

        if (data.username) {
            const existingPengurus = await db.Pengurus.findOne({ where: { username: data.username } });
            if (existingPengurus && existingPengurus.id !== doc.id) {
                const error = new Error('Username already exists');
                throw error;
            }
        }

        if (data.username) doc.username = data.username;
        if (data.full_name) doc.full_name = data.full_name;
        if (data.is_active !== undefined) {
            doc.is_active = data.is_active === 'true';
        }
        if (data.superUser !== undefined) {
            doc.superUser = data.superUser === 'true';
        }

        await doc.save();

        const result = {
            id: doc.id,
            username: doc.username,
            full_name: doc.full_name,
            is_active: doc.is_active,
            superUser: doc.superUser,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };

        callback(result, '');
    } catch (error) {
        if (error.message.includes('invalid input syntax for type uuid')) {
            error.message = 'Pengurus not found';
        }
        console.log(error);
        callback('', error);
    }
};

const destroy = async (req, res, callback) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        const doc = await db.Pengurus.findByPk(id);

        if (!doc) {
            const error = new Error('Pengurus not found');
            throw error;
        }

        const isSuperUser = req.user.superUser;
        const isDeletingSelf = userId === id;
        const isDeletingNonSuperUser = isSuperUser && !doc.superUser;

        if (!(isDeletingSelf || isDeletingNonSuperUser)) {
            const error = new Error('Unauthorized: You do not have permission to delete this admin');
            throw error;
        }

        const result = {
            id: doc.id,
            username: doc.username,
            full_name: doc.full_name,
            is_active: doc.is_active,
            superUser: doc.superUser,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };

        await doc.destroy();

        callback(result, '');
    } catch (error) {
        if (error.message.includes('invalid input syntax for type uuid')) {
            error.message = 'Pengurus not found';
        }
        console.log(error);
        callback('', error);
    }
};

module.exports = { login, findAll, findOne, create, update, destroy };
