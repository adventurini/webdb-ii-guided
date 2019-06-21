const knex = require("knex");

const knexConfig = {
  client: "sqlite3", // the npm module we installed
  useNullAsDefault: true, // needed when working with SQLite
  connection: {
    filename: "./data/rolex.db3" // we need to create the data folder and the rolex.db3 database
  }
};

const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("roles");
}

function findById(id) {
  return db("roles")
    .where({ id: req.params.id })
    .first();
}

function add(role) {
  return db("roles")
    .insert(role, "id")
    .then(x => {
      const [id] = x;
      findById(id);
    });
}

function update(id, changes) {
  return;
  //look into our database
  db("roles")
    //lookup in the database with the id ---->
    .where({ id })
    //make CHANGES
    .update(changes)
    // SEND CHANGES BACK, BUT HOW?
    // RECEIVE BACK A COUNT!!!!
    .then(count => {
      if (count > 0) {
        return findById(id)
      } else {
        return null;
      }
    });
}

function remove(id) {
    return findById(id).then(role => {
      if (role) {
        return db('roles')
          .where({ id })
          .del()
          .then(() => {
            return role;
          });
      } else {
        return null;
      }
    });
  }
