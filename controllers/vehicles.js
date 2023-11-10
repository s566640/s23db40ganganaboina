const vehicles = require("../models/vehicles");
var Vehicles = require("../models/vehicles");

// List of all Vehicles
exports.vehicles_list = async function (req, res) {
    try {
        theVehicles = await Vehicles.find();
        res.send(theVehicles);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// for a specific Vehicles.
exports.vehicles_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Vehicles detail: ' + req.params.id);
};


// Handle Vehicles create on POST.
exports.vehicles_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Vehicles();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.color = req.body.color;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// Handle Vehicles delete form on DELETE.
exports.vehicles_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Vehicles delete DELETE ' + req.params.id);
};


// Handle Vehicles update form on PUT.
exports.vehicles_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Vehicles update PUT' + req.params.id);
};


// VIEWS
// Handle a show all view
exports.vehicles_view_all_Page = async function (req, res) {
    try {
        theVehicles = await Vehicles.find();
        res.render('vehicles', { title: 'Vehicle Search Results', results: theVehicles });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.vehicles_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await vehicles.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };

    exports.vehicles_update_put = async function(req, res) {
        console.log(`update on id ${req.params.id} with body
        ${JSON.stringify(req.body)}`)
        try {
        let toUpdate = await vehicles.findById( req.params.id)
        // Do updates of properties
        if(req.body.name)
        toUpdate.name = req.body.name;
        if(req.body.color) toUpdate.color = req.body.color;
        if(req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
        } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
        failed`);
        }
        };