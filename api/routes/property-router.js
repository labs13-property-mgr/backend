const router = require('express').Router();
const Db = require('../models/property-model');

router.get('/', async (req, res) => {
	try {
		const property = await Db.find();
		res.status(200).json(property);
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const property = await Db.findById(req.params.id);
		if (property) {
			res.status(200).json(property);
		} else {
			res.status(404).json({ message: 'Property not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

router.post('/', async (req, res) => {
	try {
		const property = await Db.add(req.body);
		res.status(201).json(property);
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
			res.status(404).json({ message: 'Property not ID not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error updating' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await Db.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'Property deleted' });
		} else {
			res.status(404).json({ message: 'Property could not be found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error deleting property' });
	}
});

module.exports = router;
