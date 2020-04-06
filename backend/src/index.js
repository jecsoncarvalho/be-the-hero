const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())
app.use(routes);

/**
 * Rota / Recurso
 */

/** TIPOS DE PARAMETROS
 * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
 * Rote Params: Parâmetros utilizados para identificar recursos (rota)
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/**
 * Usando Query Builder knex JS
 */



app.listen(3333);