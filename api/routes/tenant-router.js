<<<<<<< Updated upstream
const router = require('express').Router()
const Db = require('../models/tenant-model')

router.get('/', async (req, res) => {
  try {
    const tenant = await Db.find()
    res.status(200).json(tenant)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const tenant = await Db.add(req.body)
    res.status(201).json(tenant)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

module.exports = router
=======
const router = require("express").Router();
// const db = require("../models/tenant-model");
const db = require("../../data/dbConfig.js");

// router.get("/", async (req, res) => {
//   try {
//     const tenant = await Db.find();
//     res.status(200).json(tenant);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const tenant = await Db.add(req.body);
//     res.status(201).json(tenant);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// });

// get list of tenants
router.get("/", (req, res) => {
  db("tenant")
    .then(tenants => {
      res.status(200).json(tenants);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// post -  add tenants
router.post("/", (req, res) => {
  const tenant = req.body;

  db("tenant")
    .insert(tenant)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// put - edit tenant information
router.put("/:id", (req, res) => {
  db("tenant")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "tenant not found" });
      }
    });
});

// delete - delete individual tenants
router.delete("/:id", (req, res) => {
  db("tenant")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "action not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
>>>>>>> Stashed changes
