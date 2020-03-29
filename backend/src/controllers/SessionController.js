const connection = require('../database/connect');

module.exports = {

    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(404).json({ error: 'No ONG Found' });
        }

        return res.json(ong);
    }

}