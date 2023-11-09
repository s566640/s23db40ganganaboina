var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var vehicles_controller = require('../controllers/vehicles');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// VEHICLES ROUTES ///
// POST request for creating a Costume.
router.post('/vehicles', vehicles_controller.vehicles_create_post);
// DELETE request to delete Costume.
router.delete('/vehicles/:id', vehicles_controller.vehicles_delete);
// PUT request to update Costume.
router.put('/vehicles/:id', vehicles_controller.vehicles_update_put);
// GET request for one Costume.
router.get('/vehicles/:id', vehicles_controller.vehicles_detail);
// GET request for list of all Costume items.
router.get('/vehicles', vehicles_controller.vehicles_list);
module.exports = router;