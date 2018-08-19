const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();


// Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
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
  database: "bamazon_app"
});


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });

  next();
});


app.get("/", (req, results) => {
  var q = "SELECT COUNT(*) AS count FROM products";
  connection.query(q, function (err, res) {
    if (err) throw err;
    // console.log(res[0]);
    var count = res[0].count;
    // results.send('<h1>You have ' + count +  ' favorite songs.</h1>');
    // connection.end();
    results.render('home', {
      data: count
    });
  });
});



app.post("/register", (request, results) => {


  var track = {
    product_name: request.body.product_name,
    image_url: request.body.image_url,
    product_desc: request.body.product_desc,
    department_name: request.body.department_name,
    instock_quantity: request.body.instock_quantity,
    consumer_price: request.body.consumer_price,
    business_cost: request.body.business_cost
  };

  console.log(JSON.stringify(request.body));
  // var s = {email: req.body.email};
  // console.log("Post Request Sent to Register", req.body);
  // var qinsert = "INSERT INTO favorite_songs (song, artis, score, genre) VALUES("+ track.title +", "+ track.artist +", " + track.sc + "," + track.g + ")";

  var sql = `INSERT INTO products SET ?`;
  let query = connection.query(sql, track, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  })
  // 
  results.render('test', {
    data: 5,
    product_name: request.body.product_name,
    image_url: request.body.image_url,
    product_desc: request.body.product_desc,
    department_name: request.body.department_name,
    instock_quantity: request.body.instock_quantity,
    consumer_price: request.body.consumer_price,
    business_cost: request.body.business_cost
  })
});

app.get('/data', function (req, res) {
  var obj = {};

  let query = connection.query('SELECT * FROM products WHERE instock_quantity > 0 ORDER BY consumer_price DESC', function (err, result) {

    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };
      console.log(obj);
      res.render('print', obj);

    }
  });

});



app.get("/purchase", (request, results) => {

  console.log(JSON.stringify(request.body));

  results.render('buy', request)
});

// Adam
// Adam's management console code ==================================================================
app.get('/manager', function (req, res) {
  var obj = {};
  let query = connection.query('SELECT * FROM products WHERE instock_quantity > 0 ORDER BY consumer_price DESC', function (err, result) {
    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };
      console.log(obj);
      res.render('report1', obj);
    }
  });
});

/////////////////////////////////Bowden working here
app.get('/customer', function (req, res) {
  var obj = {};
  let query = connection.query('SELECT * FROM users WHERE user_id=1', function (err, result) {
    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };
      console.log(obj);
      res.render('customer', obj);

    }
  });
});
app.get('/jaguar', function (req, res) {
  var obj = {};
  let query = connection.query("SELECT * FROM products WHERE instock_quantity > 0 AND product_name= 'Jaguar' ORDER BY consumer_price DESC", function (err, result) {
    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };
      console.log(obj);
      res.render('print', obj);

    }
  });
});
app.get('/Lambo', function (req, res) {
  var obj = {};
  let query = connection.query('SELECT * FROM products WHERE instock_quantity > 0 ORDER BY consumer_price DESC', function (err, result) {
    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };
      console.log(obj);
      res.render('print', obj);

    }
  });
});
app.get('/Ferrari', function (req, res) {
  var obj = {};
  let query = connection.query('SELECT * FROM products WHERE instock_quantity > 0 ORDER BY consumer_price DESC', function (err, result) {
    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };
      console.log(obj);
      res.render('print', obj);

    }
  });
});

app.get("/buy/:productid", function (req, res) {
  var chosen = req.params.productid;
  var obj = {}
  console.log(chosen, "need to integrate into query");
  let sqlquery = `SELECT * FROM products WHERE item_id = ${chosen}`
  let query = connection.query(sqlquery, function (err, result) {
    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };
      // console.log(obj);
      res.render('purchase', obj);
    }
  });

});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});