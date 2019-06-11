const router = require('express').Router();
const Db = require('../models/user-model');

router.get('/', async (req, res) => {
	try {
		const owner = await Db.find();
		res.status(200).json(owner);
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const owner = await Db.find(req.params.id);
		if (owner) {
			res.status(200).json(owner);
		} else {
			res.status(404).json({ message: 'Owner not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});

module.exports = router;
