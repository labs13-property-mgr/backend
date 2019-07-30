const express = require("express");
const router = express.Router();
const db = require("../models/property-model");
const tenantModel = require("../models/tenant-model");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const property = await db.find();

    // secondary sorty option
    property.sort(function(a, b) {
      if (a.property_name < b.property_name) {
        return -1;
      }
      if (a.property_name > b.property_name) {
        return 1;
      }
      return 0;
    });

    res.status(200).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// change get router to return list of properties alphabetically

// router.get("/", async (req, res) => {
//   try {
//     const properties = await db.find();

//     const propertyWithImages = await db.findImages();
//     if (properties) {
//       // const data = properties.map(property => {
//       //   return property;

//       //   // return property;
//       // });
//       const datawithImages = propertyWithImages.map(p => {
//         return {
//           ...p,
//           images: properties.find(pt => {

//             p.property_id === pt.id;
//           })
//         };
//       });

//       res.status(200).json(datawithImages);

//     } else {
//       next({ code: 400 });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// });

router.get("/propertieswithtenants", async (req, res, next) => {
  try {
    const properties = await db.find();
    const propertieswithTenants = await db.findTenants();
    if (properties) {
      // const data = properties.map(property => {
      //   return property;

      //   // return property;
      // });
      const datawithTenants = propertieswithTenants.map(p => {
        return {
          ...p,
          tenants: properties.find(pt => {
            p.property_id === pt.id;
          })
        };
      });
      res.status(200).json(datawithTenants);
    } else {
      next({ code: 400 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await db.findById(req.params.id);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "property not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await db.add(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(res);
    console.log(req);
    // res.status(404).json({ message: `${req.params.id}, ${req.body}` });
    const updated = await db.update(req.params.id, req.body);

    if (req.params.id && updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "property ID not found" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "property deleted" });
    } else {
      res.status(404).json({ message: "property could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting property" });
  }
});

router.post("/:id/tenant", async (req, res) => {
  const tenantInfo = { property_id: req.params.id };
  try {
    const tenant = await tenantModel.insert(tenantInfo);
    res.status(200).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//==================tenants by property id
router.get("/:id/tenant", async (req, res, next) => {
  try {
    const property_id = req.params.id;
    const property = await db.findById(property_id);
    const propertyTenants = await db.findTenantsByProperty(property_id);
    if (property) {
      const data = { ...property, tenants: propertyTenants };
      res.status(200).json(data);
    } else {
      next({ code: 400 });
    }
  } catch (err) {
    next(err);
  }
});
//==================sercive request by property id
router.get("/:id/services", async (req, res) => {
  const property_id = req.params.id;
  db.findServByProp(property_id)
    .then(services => {
      if (services) {
        res.status(200).json(services);
      } else {
        res.status(404).json({
          Message: `These services seem to be missing...maybe they're all taken care of?`
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `The services seems to be missing try again` });
    });
});

//get service history by property id
// router.get("/:id/serviceHistory", (req, res) => {
//   const property_id = req.params.id;
//   db.findServHisByProp(property_id)
//     .then(services => {
//       if (services) {
//         res.status(200).json(services);
//       } else {
//         res.status(404).json({
//           Message: `A history of the properties services are missing`
//         });
//       }
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ message: `The services seem to be missing try again` });
//     });
// });

module.exports = router;
