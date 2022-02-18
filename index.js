const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

const { Pool } = require('pg');
var pool = new Pool({
    connectionString: "postgres://postgres:bootstrap@localhost/users"
    // connectionString: "postgres://pdxjfyvkfttkpe:29b780b3e352b2f5e4b08595282cd64dc7af55c208966c27f6c9740f7551eab9@ec2-34-233-157-9.compute-1.amazonaws.com:5432/doucu0hcsvt85",
    // ssl: {
    //     rejectUnauthorized: false
    // }
})

//stuff that needs to be included
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//what happens when you go to each url
app.get('/', async (req, res) =>{
  var UsersTable = `SELECT * FROM rect`;
  pool.query(UsersTable, (error,result) => {
    if (error) {
      res.end(error);
    }
    var results = { 'rows' : result.rows };
    res.render('pages/index', results);
  })
})

app.get('/users/:id', (req,res)=>{
  //per id stuff here
})




app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
