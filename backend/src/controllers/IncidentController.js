const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const { page } = request.query

        const [count] = await connection('incidents').count();
        
        const retorno = await connection('incidents')
        .limit(5)
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .offset((page - 1) * 5)
        .select(
            [   'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'   ]);

        console.log(count);
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(retorno);
    },

    async create(request, response) {
        const {title, description, value} = request.body; 
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return response.json({ id })
    },

    async remove (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();
        
        if (incident.ong_id != ong_id) {
            return response.status(401).json({  error:  'Operation not permitted.'})
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}