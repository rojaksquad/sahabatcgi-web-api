const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS

        if (!user) {
            Responser.error(res, "Invalid login credentials", {}, 401);
            return
        }

        user.id = 1
        const payload = {
            user: {
                email: user.email,
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                Responser.success(res, "Login success", {token}, 200);
            }
        );
    } catch (error) {
        console.error(error.message);
        Responser.error(res, "Server error when generating token", {}, 500);
        return
    }
});

module.exports = router