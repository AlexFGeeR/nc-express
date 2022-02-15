const { Router } = require('express');
const productsRepository = require('../repositories/products.repository');
const basketRepository = require('../repositories/basket.repository');

const router = new Router();

router.get('/', async (_request, response) => {
	const products = await productsRepository.getAllProducts();
	const list = await basketRepository.getAll();
	let counter = 0;
	list.forEach(item =>{ 
		counter += item.count;
	})
	response.render('pages/catalog', { products, counter });
});

router.post('/', async(_request, response) => {
	basketRepository.addNew(_request.body.id, _request.body.name, _request.body.price);
})

module.exports = router;