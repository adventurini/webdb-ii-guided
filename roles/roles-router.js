const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/roledex.db3"
  }
};

const db = knex(knexConfig);
const Roles = require("./roles-model.js");

const router = require("express").Router();

router.get("/", (req, res) => {
  Roles.find()
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/:id", (req, res) => {
  Roles.findById(id)
    .then(role => {
      console.log(role);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: "Role Not Found!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Roles.add(req.body)
    .then(role => {
      res.status(200).json(role);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Roles.update(req.params.id, req.body)
    .then(role => {
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: "Role not found" });
      }
    })
    .catch(error => {
      // this catch will be run for any errors including errors in the nested call to get the role by id
      res.status(500).json(error);
    });
  //WHERE THE ID MATCHES THE REQ.PARAMS.ID, SEND BACK THE NEW ROLE
});

router.delete('/:id', (req, res) => {
  Roles.remove(req.params.id)
    .then(role => {
      if (role) {
        // return the deleted role?
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
