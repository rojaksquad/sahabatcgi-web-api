const db = require(appDir + '/models/index');

// Find all users
const findAll = async (req, res, callback) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;

        var options = {
            page: page < 1 ? 1 : page,
            paginate: per_page,
            order: [['id', 'desc']],
        };

        // Get all users
        const { docs, pages, total } = await db.User.paginate(options);

        if (docs) {
            let result = {
                data: await docs,
                currentPage: page,
                nextPage: page >= pages ? false : page + 1,
                totalItems: total,
                totalPages: pages,
            };

            callback(result, '');
        }
    } catch (error) {
        console.log(error);
        callback('', error);
    }
    
}

module.exports = { findAll };
