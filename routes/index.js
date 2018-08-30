var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/catalogo', function(req, res, next) {
  res.render('catalogo');
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout');
});

module.exports = router;
