const express = require('express');
const router = express.Router();
const db = require('../models/property-model');
const tenantModel = require('../models/tenant-model');
const dbKnex = require('../../data/dbConfig');
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const property = await db.find();
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await db.findById(req.params.id);
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
    const property = await db.insert(req.body);
    res.status(201).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post('/:id/tenant', async (req, res) => {
  const tenantInfo = { property_id: req.params.id };
  try {
    const tenant = await tenantModel.insert(tenantInfo);
    res.status(200).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await dbKnex('property').update(req.body);
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ code: err.code, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
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
