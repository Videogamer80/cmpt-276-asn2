const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

const { Pool } = require('pg');
var pool = new Pool({
    // connectionString: "postgres://postgres:bootstrap@localhost/users"
    connectionString: "postgres://djdnzwjfbngyrr:cb97dd3f8495d27f7a4b621316da8e5ee295b2abebb1a50c1050c24522683f1c@ec2-3-228-222-169.compute-1.amazonaws.com:5432/d402ckdamtdvna",
    ssl: {
        rejectUnauthorized: false
    }
})

//stuff that needs to be included
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//what happens when you go to each url

//database
app.get('/', async (req, res) =>{
  var UsersTable = `select * from rect`;
  pool.query(UsersTable, (error,result) => {
    if (error) {
      res.end(error);
    }
    var results = { 'rows' : result.rows };
    res.render('pages/index', results);
  })
})

//add rectangles
app.post('/addrect', (req,res)=>{
  let newname = req.body.newName;
  let newcolor = req.body.newColor;
  let newwidth = req.body.newWidth;
  let newheight = req.body.newHeight;

  if(newname != "" && newcolor != "" && newwidth != "" && newheight != "") {
    pool.query(`insert into rect (name, color, width, height) values ('${newname}', '${newcolor}', ${newwidth}, ${newheight});`);
  }

  setTimeout(() => { res.redirect('/'); }, 500);
})

//go to shape bios
app.get('/users/:id', (req,res)=>{
  var BioID = `select * from rect where id=${req.params.id}`;
  pool.query(BioID, (error,result) => {
    if (error) {
      res.end(error);
    }
    var results = { 'rows' : result.rows };
    res.render('pages/data', results);
  })
})

//delete rectangles
app.get('/delete/:id', (req,res)=>{
  let currentID = req.params.id;

  pool.query(`delete from rect where id=${currentID}`);

  setTimeout(() => { res.redirect('/'); }, 500);
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
