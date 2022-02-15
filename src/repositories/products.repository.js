const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/file.utils');

const FILE_PATH = path.resolve(path.dirname(require.main.filename), 'data', 'products.json');

const productsRepository = {
	async getAllProducts() {
		return await readJsonFile(FILE_PATH) || [];
	}
}

module.exports = productsRepository;