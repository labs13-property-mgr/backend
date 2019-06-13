const router = require('express').Router()
const db = require('../models/property-model')

//====================================Get Routers
router.get('/', async (req, res) => {
  try {
    const property = await db.find()
    res.status(200).json(property)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

//------------------------------Get by ID
router.get("/:id", (req, res) => {
  const property_id = req.params.id;
  db.findById(property_id)
  .then(property => {
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "property not found" });
    }
  })
  .catch(error => {
    if (error) {
      res.status(500).json({ message: `Error : ${error}` })
    }
  });
});
//-------------------------------Get Tenants by Property ID
router.get("/:id/tenants", async (req, res) => {
  const property_id = req.params.id;
  db
    .findTenantByProp(property_id)
    .then(tenants => {
      if (tenants) {
        res.status(200).json(tenants);
      } else {
        res
          .status(404)
          .json({
            Message: "tenants don't seem to be home..."
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `The tenants seems to be missing try again` });
    });
});

//=====================================Post Routers
router.post('/', async (req, res) => {
  try {
    const property = await db.add(req.body)
    res.status(201).json(property)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

module.exports = router
