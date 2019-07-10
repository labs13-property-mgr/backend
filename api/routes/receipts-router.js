const express = require('express');
const router = express.Router();
const db = require('../models/reseipts-model');

// get list of receipts
router.get('/', async (req, res) => {
    try {
      const receipt = await db.find();
      res.status(200).json(receipt);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  });
  
  // get receipt by ID
  router.get('/:id', async (req, res) => {
    try {
      const receipt = await db.findById(req.params.id);
      if (receipt) {
        res.status(200).json(receipt);
      } else {
        res.status(404).json({ message: 'receipt not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  });
  
  // post receipt
  router.post('/', async (req, res) => {
    try {
      const receipt = await db.add(req.body);
      res.status(201).json(receipt);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  });
  
  // edit receipt
  router.put('/:id', async (req, res) => {
    try {
      const updated = await db.update(req.params.id, req.body);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'receipt ID not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating' });
    }
  });
  
  // delete receipt
  router.delete('/:id', async (req, res) => {
    try {
      const count = await db.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'receipt deleted' });
      } else {
        res.status(404).json({ message: 'receipt could not be found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting receipt' });
    }
  });
  
  module.exports = router;