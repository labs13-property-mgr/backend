const express = require('express');
const router = express.Router();
const db = require('../models/propImage-model');

// get list of images
router.get('/', async (req, res) => {
    try {
      const image = await db.find();
      res.status(200).json(image);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  });
  
  // get image by ID
  router.get('/:id', async (req, res) => {
    try {
      const image = await db.findById(req.params.id);
      if (image) {
        res.status(200).json(image);
      } else {
        res.status(404).json({ message: 'image not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  });
  
  // post image
  router.post('/', async (req, res) => {
    try {
      const image = await db.add(req.body);
      res.status(201).json(image);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  });
  
  // edit image
  router.put('/:id', async (req, res) => {
    try {
      const updated = await db.update(req.params.id, req.body);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'image ID not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating' });
    }
  });
  
  // delete image
  router.delete('/:id', async (req, res) => {
    try {
      const count = await db.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'image deleted' });
      } else {
        res.status(404).json({ message: 'image could not be found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting image' });
    }
  });
  
  module.exports = router;