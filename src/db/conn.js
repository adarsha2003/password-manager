//For secure connection:
const { Pool } = require("pg");

// Configure the database connection.

const config = {
  user: "adarsha",
  password: "Wb1Bfu1XqM4LQkXX",
  host: "free-tier8.aws-ap-southeast-1.cockroachlabs.cloud",
  database: "passnotes-140.defaultdb",
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


  
  module.exports = {
    showpasswd,
    addpasswd
  }
