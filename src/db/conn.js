//For secure connection:
const { Pool } = require("pg");

// Configure the database connection.

const config = {
  user: "adarsha",
  password: "I_h7Fjy7qsn8ARsC",
  host: "free-tier8.aws-ap-southeast-1.cockroachlabs.cloud",
  database: "passnotes-139.defaultdb",
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
  //For secure connection:
  /*ssl: {
        ca: fs.readFileSync('/certs/ca.crt')
            .toString()
    }*/
};

// Create a connection pool

const pool = new Pool(config);

const showpasswd = (request, response) => {
    pool.query('SELECT * FROM passwords', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response) => {
    var username = request.params.username
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`results:`, results.rows)
    })
  }
  
  const addpasswd = (request, response) => {
    const { id, tagname, url, username, email, password } = request.body
    pool.query('CREATE TABLE IF NOT EXISTS passwords (id STRING NOT NULL, tagname STRING NOT NULL, url STRING NOT NULL, username STRING NOT NULL, email STRING, password STRING, CONSTRAINT "primary" PRIMARY KEY (id ASC, url ASC, password ASC))',  (error, results) => {
      if (error) {
        throw error
      }
      console.log(`Created User table if it does not exist`)},
    pool.query('INSERT INTO passwords (id, tagname, url, username, email, password) VALUES ($1, $2, $3, $4, $5, $6)', [id, tagname, url, username, email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.redirect("/add-passwd")
    })
    )}

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
        app
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    showpasswd,
    getUserById,
    addpasswd,
    updateUser,
    deleteUser
  }
