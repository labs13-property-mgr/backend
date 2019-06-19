const express = require('express');
const router = express.Router();
const Db = require('../models/tenant-model');

router.get('/', async (req, res) => {
	try {
		const tenant = await Db.find();
		res.status(200).json(tenant);
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

router.post('/', async (req, res) => {
	try {
		const tenant = await Db.add(req.body);
		res.status(201).json(tenant);
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
			res.status(404).json({ message: 'Tenant not ID not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error updating' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await Db.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'Tenant deleted' });
		} else {
			res.status(404).json({ message: 'Tenant could not be found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error deleting tenant' });
	}
});

module.exports = router;
