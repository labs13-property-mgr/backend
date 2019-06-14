const router = require('express').Router();
const Db = require('../models/property-model');

// get list of vendors
router.get('/', async (req, res) => {
	try {
		const vendor = await Db.find();
		res.status(200).json(vendor);
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

// get vendor by ID
router.get('/:id', async (req, res) => {
	try {
		const vendor = await Db.findById(req.params.id);
		if (vendor) {
			res.status(200).json(vendor);
		} else {
			res.status(404).json({ message: 'Vendor not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

// post vendor
router.post('/', async (req, res) => {
	try {
		const vendor = await Db.add(req.body);
		res.status(201).json(vendor);
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

// edit vendor
router.put('/:id', async (req, res) => {
	try {
		const updated = await Db.update(req.params.id, req.body);
		if (updated) {
			res.status(200).json(updated);
		} else {
			res.status(404).json({ message: 'Vendor ID not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error updating' });
	}
});

// delete vendor
router.delete('/:id', async (req, res) => {
	try {
		const count = await Db.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'Vendor deleted' });
		} else {
			res.status(404).json({ message: 'Vendor could not be found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error deleting vendor' });
	}
});
