const express = require('express');
const router = express.Router();
const db = require('../models/tenant-model');

router.get('/', async (req, res) => {
  try {
    const tenant = await db.find();
    res.status(200).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tenant = await db.findById(req.params.id);
    if (tenant) {
      res.status(200).json(tenant);
    } else {
      res.status(404).json({ message: 'tenant not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//==================sercive request by tenant id
router.get('/:id/services', async (req, res) => {
  const tenant_id = req.params.id;
  db.findServByTenant(tenant_id)
    .then(services => {
      if (services) {
        res.status(200).json(services);
      } else {
        res.status(404).json({
          Message: `The services seem to be missing...maybe they're all taken care of?`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `The services seems to be missing try again` });
    });
});

// adds a tenant to a property ---
// router.post("/", async (req, res) => {
//   const { property_id, owner_id } = req.body; // have these in the body

//   if (!property_id || !owner_id) {
//     res.status(422).json({ message: "I need a property and user id" });
//   }
//   try {
//     const tenant = await db.add(req.body);
//     res.status(201).json(tenant);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// });

router.post('/', async (req, res) => {
  try {
    const tenant = await db.add(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// update tenant info
router.put('/:id', async (req, res) => {
  try {
    const updated = await db.update(req.params.id, req.body);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'Tenant ID not found' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// delete a tenant
router.delete('/:id', async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'Tenant deleted' });
    } else {
      res.status(404).json({ message: 'Tenant ID not found' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
