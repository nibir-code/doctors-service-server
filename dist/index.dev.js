"use strict";

var express = require('express');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ServerApiVersion = _require.ServerApiVersion;

var cors = require('cors');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
var uri = "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASS, "@cluster0.yvihejd.mongodb.net/?retryWrites=true&w=majority");
var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

function run() {
  var serviceCollection;
  return regeneratorRuntime.async(function run$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          serviceCollection = client.db("doctors_service").collection('services');
          app.get('/service', function _callee(req, res) {
            var query, cursor, services;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    query = {};
                    cursor = serviceCollection.find(query);
                    _context.next = 4;
                    return regeneratorRuntime.awrap(cursor.toArray());

                  case 4:
                    services = _context.sent;
                    res.send(services);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 5:
          _context2.prev = 5;
          return _context2.finish(5);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0,, 5, 7]]);
}

run()["catch"](console.dir);
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});