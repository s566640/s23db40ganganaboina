var express = require('express');
var vehicles_controller = require('../controllers/vehicles');
var router = express.Router();

/* GET home page. */
router.get('/', vehicles_controller.vehicles_view_all_Page );
router.get('/vehicles/:id', vehicles_controller.vehicles_detail);
/* GET detail vehicles page */
router.get('/detail', vehicles_controller.vehicles_view_one_Page);
/* GET create vehicle page */
router.get('/create', vehicles_controller.vehicles_create_Page);
/* GET create update page */
router.get('/update', vehicles_controller.vehicle_update_Page);
/* GET delete costume page */
router.get('/delete', vehicles_controller.vehicles_delete_Page);

module.exports = router;