var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getProducts(req, res, next) {
  res.status(200).send(data.products);
}

function getProduct(req, res, next) {
  var id = +req.params.id;
  var product = data.products.filter(function(p) {
    return p.id === id;
  })[0];

  if (product) {
    res.status(200).send(product);
  } else {
    four0four.send404(req, res, 'product ' + id + ' not found');
  }
}
