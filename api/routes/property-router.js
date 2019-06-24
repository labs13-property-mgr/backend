const express = require("express");
const router = express.Router();
const db = require("../models/property-model");

// get list of properties
router.get("/", async (req, res) => {
  try {
    const property = await db.get();
    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// get property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await db.getById(req.params.id);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// post a property
// router.post('/', async (req, res) => {
// 	try {
// 		const property = await Db.add(req.body);
// 		res.status(201).json(property);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error.message);
// 	}
// });

// Larry Simiyu - Post property router test
router.post("/", async (req, res) => {
  if (!req.body.property_name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for the property" });
  }

  try {
    let newProperty = await db.insert(req.body);
    let updatedArray = await db.get();
    return res.status(201).json({
      // lazy loading
      id: newProperty.id,
      name: req.body.property_name,
      // also return the address
      address: req.body.address,
      properties: updatedArray
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// add a tenant to a property - uncomment when done testing larry
// router.post("/:id/tenant", async (req, res) => {
//   const tenantInfo = { property_id: req.params.id };
//   try {
//     const tenant = await Db.addTenant(tenantInfo);
//     res.status(200).json(tenant);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// });

// edit the property
router.put("/:id", async (req, res) => {
  try {
    const updated = await db.update(req.params.id, req.body);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "Property ID not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating" });
  }
});

// delete a property
router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Property deleted" });
    } else {
      res.status(404).json({ message: "Property could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting property" });
  }
});

module.exports = router;
