const express = require('express')
const router = express.Router()
const Db = require('../models/property-model')

// get list of properties
router.get('/', async (req, res) => {
  try {
    const property = await Db.find()
    res.status(200).json(property)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

// get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Db.findById(req.params.id)
    if (property) {
      res.status(200).json(property)
    } else {
      res.status(404).json({ message: 'Property not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

// post a property
router.post('/', async (req, res) => {
  try {
    const property = await Db.add(req.body)
    res.status(201).json(property)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

// add a tenant to a property
router.post('/:id/tenants', async (req, res) => {
  const tenantInfo = { ...req.body, property_id: req.params.id }
  try {
    const tenant = await Db.addTenant(tenantInfo)
    res.status(200).json(tenant)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

// edit the property
router.put('/:id', async (req, res) => {
  try {
    const updated = await Db.update(req.params.id, req.body)
    if (updated) {
      res.status(200).json(updated)
    } else {
      res.status(404).json({ message: 'Property not ID not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating' })
  }
})

// delete a property
router.delete('/:id', async (req, res) => {
  try {
    const count = await Db.remove(req.params.id)
    if (count > 0) {
      res.status(200).json({ message: 'Property deleted' })
    } else {
      res.status(404).json({ message: 'Property could not be found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error deleting property' })
  }
})

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
router.get('/:id', (req, res) => {
  const property_id = req.params.id
  db.findById(property_id)
    .then(property => {
      if (property) {
        res.status(200).json(property)
      } else {
        res.status(404).json({ message: 'property not found' })
      }
    })
    .catch(error => {
      if (error) {
        res.status(500).json({ message: `Error : ${error}` })
      }
    })
})
//-------------------------------Get Tenants by Property ID
router.get('/:id/tenants', async (req, res) => {
  const property_id = req.params.id
  db.findTenantByProp(property_id)
    .then(tenants => {
      if (tenants) {
        res.status(200).json(tenants)
      } else {
        res.status(404).json({
          Message: "tenants don't seem to be home..."
        })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `The tenants seems to be missing try again` })
    })
})

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
