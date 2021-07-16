//For secure connection:
const { Pool } = require("pg");

// Configure the database connection.

const config = {
  user: "adarsha",
  password: "@MLHpassword123",
  host: "free-tier5.gcp-europe-west1.cockroachlabs.cloud",
  database: "basic-mink-643.defaultdb",
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

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
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
  
  const interestform = (request, response) => {
    const { username, email, password } = request.body
    pool.query('CREATE TABLE IF NOT EXISTS interestform (username STRING NOT NULL, email STRING, password STRING, CONSTRAINT "primary" PRIMARY KEY (username ASC, email ASC))',  (error, results) => {
      if (error) {
        throw error
      }
      console.log(`Created User table if it did not exists`)},
    pool.query('INSERT INTO interestform (username, email, password) VALUES ($1, $2, $3)', [username, email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.redirect("/thanks-for-your-interest")
    })
    )}
  
    const feedbacksubmit = (request, response) => {
      const { username, email, password } = request.body
      pool.query('CREATE TABLE IF NOT EXISTS feedback (email STRING NOT NULL, description STRING, CONSTRAINT "primary" PRIMARY KEY (email ASC))',  (error, results) => {
        if (error) {
          throw error
        }
        console.log(`Created User table if it did not exists`)},
      pool.query('INSERT INTO feedback (email, description) VALUES ($1, $2)', [email, description], (error, results) => {
        if (error) {
          throw error
        }
        response.redirect("/feedback-success")
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

  const postlogin = (request, response) => {
    const { username, password } = request.body
    pool.query('ALTER TABLE users VALIDATE CONSTRAINT admin', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.redirect("/thanks-for-your-interest:")
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    interestform,
    updateUser,
    deleteUser,
    feedbacksubmit,
    postlogin
  }
