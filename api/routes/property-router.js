const express = require('express');
const router = express.Router();
const db = require('../models/property-model');
const tenantModel = require('../models/tenant-model');
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const property = await db.get();
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
      res.status(404).json({ message: 'property not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await db.add(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await db.update(req.params.id, req.body);
    if (req.params.id && updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'property ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'property deleted' });
    } else {
      res.status(404).json({ message: 'property could not be found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting property' });
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

module.exports = router;
