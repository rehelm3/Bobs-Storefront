var express = require('express');
var mysql = require("mysql");
var bodyParser = require('body-parser');
var app = express();

// Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


const port = process.env.PORT || 8080;


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "qwertyroot71",
  database: "animals_db"
});



app.get("/", (req, results) => {
  var q = "SELECT COUNT(*) AS count FROM favorite_songs";
  connection.query(q, function(err, res) {
    if (err) throw err;
    // console.log(res[0]);
    var count = res[0].count;
    // results.send('<h1>You have ' + count +  ' favorite songs.</h1>');
    // connection.end();
    results.render('home', {data: count});  
  });
  
});
// using Brad Traversy technique here
app.post("/register", (request, results) => {
let post = {
  song: "brad song",
  artis: "bad keys",
  score: 7,
  genre: "post-pop"
};
let sql = 'INSERT INTO favorite_songs SET ?';
  // var s = {email: req.body.email};
  // console.log("Post Request Sent to Register", req.body);
  // var qinsert = "INSERT INTO favorite_songs (song, artis, score, genre) VALUES("+ track.title +", "+ track.artist +", " + track.sc + "," + track.g + ")";
//   var qinsert = "INSERT INTO favorite_songs (song, artis, score, genre) VALUES('Zeppo', 'Pixies', '9', 'alt')";
//  console.log(qinsert);
  let query = connection.query(sql, post, (err, results) => {
    if(err) throw err;
    console.log(results);
    results.send('Added')
    // results.redirect("/");
  })
} )

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
