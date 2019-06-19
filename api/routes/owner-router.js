const express = require('express');
const router = express.Router();
const Db = require('../models/property-model');

router.get('/', async (req, res) => {
	const owner = await find('users');
	try {
		res.status(200).json(owner);
	} catch (err) {
		res.status(500).json({
			error: err.message
		});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const tenant = await Db.findById(req.params.id);
		if (tenant) {
			res.status(200).json(tenant);
		} else {
			res.status(404).json({ message: 'Tenant not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

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

router.put('/:id', async (req, res) => {
	try {
		const updated = await Db.update(req.params.id, req.body);
		if (updated) {
			res.status(200).json(updated);
		} else {
			res.status(404).json({ message: 'Owner ID not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error updating' });
	}
});
module.exports = router;
