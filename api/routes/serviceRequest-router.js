const router = require("express").Router();
const db = require("../../data/dbConfig.js");

// get service order
router.get("/", (req, res) => {
  db("service_orders")
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// post a service order
router.post("/", (req, res) => {
  const order = req.body;

  db("service_orders")
    .insert(order)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// update a service order

router.put("/:id", (req, res) => {
  db("service_orders")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404)({ message: "Order not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// delete a service order

router.delete("/:id", (req, res) => {
  db("service_orders")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        req.status(404).json({ message: "Action not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
