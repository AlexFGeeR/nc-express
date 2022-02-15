const { Router } = require('express');
const basketRepository = require('../repositories/basket.repository');

const router = new Router();

router.get('/', async (_request, response) => {
	const list = await basketRepository.getAll();
	let counter = 0;
	list.forEach(item =>{ 
		counter += item.count;
	})
	response.render('pages/main', {counter});
});

module.exports = router;