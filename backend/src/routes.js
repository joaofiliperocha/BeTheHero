const express = require('express');
const ongController = require('./controllers/OngControllers');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.list);
routes.post('/ongs', ongController.create);

routes.get('/profile', profileController.index);

routes.get('/incidents', incidentController.list);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete)




module.exports = routes;