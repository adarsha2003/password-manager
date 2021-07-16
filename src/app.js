const express = require("express");
const db = require("./db/conn");
const path = require("path");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const { ENGINE_METHOD_ALL } = require("constants");
const hbs = require("hbs");


// Require the driver.ujsavdvfdas
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgresql://adarsha:@MLHpassword123@free-tier5.gcp-europe-west1.cockroachlabs.cloud:26257/basic-mink-643.defaultdb?sslmode=disable';
var client = new pg.Client(connectionString);


// setting the path
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use('/bootstrap.css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.css')))
//middleware

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path)
// routing

app.get("/",(req,res) => {
  res.render("index");
})
app.get("/post-login",(req,res) => {
  res.render("post-login");
})
app.get("/login",(req,res) => {
  res.render("login");
})
app.get("/interestform",(req,res) => {
  res.render("interestform");
})
app.get("/passwords",(req,res) => {
  res.render("passwords");
})
app.get("/thanks-for-your-interest",(req,res) => {
  res.render("thanks-for-your-interest");
})
app.get("/feedback",(req,res) => {
  res.render("feedback");
})
app.get("/guide",(req,res) => {
  res.render("guide");
})

//app.get(path, callback)
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//databse apis

  app.get('/api', (request, response) => {
    response.status(401).json(`Unauthorized/Forbidden`);
  })
  
  app.get('/api/users', db.getUsers) 
  app.get('/api/users/:id', db.getUserById)
  app.post('/api/interestform', db.interestform)
  app.post('/api/feedbacksubmit', db.feedbacksubmit)
  app.put('/api/users/:id', db.updateUser)
  app.delete('/api/users/:id', db.deleteUser)
  app.post('/post-login', db.postlogin) 



  app.get('/api/passwd', (request, response) => {
    response.status(401).json(`Unauthorized/Forbidden`);

  })

//server create
app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
})
