const express = require('express');
const router = express.Router();
const {
  add,
  find,
  findByEmail,
  remove,
  update,
  findPropByUser
} = require('../models/user-model');

router.get('/', async (req, res) => {
  try {
    const data = await find('users');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.get('/email', (req, res) => {
  const { email } = req.body;

  findByEmail(email)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  const user_id = req.params.id;
  findById(user_id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(error => {
      if (error) {
        res.status(500).json({ message: `Error : ${error}` });
      }
    });
});

router.get('/:id/properties', async (req, res) => {
  const user_id = req.params.id;
  findPropByUser(user_id)
    .then(properties => {
      if (properties) {
        res.status(200).json(properties);
      } else {
        res.status(404).json({
          Message: 'These properties are lost like the Donner party...sad indeed'
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `The properties seems to be lost try again` });
    });
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await update(req.params.id, req.body);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'User ID not found' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'User Deleted' });
    } else {
      res.status(404).json({ message: 'User ID not found' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  const userData = req.body;
  try {
    const userId = await add(userData);
    res.status(201).json(userId);
  } catch (err) {
    res.status(500).json({ code: err.code, message: err.message });
  }
});

module.exports = router;
