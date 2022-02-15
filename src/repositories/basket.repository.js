const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/file.utils');

const FILE_PATH = path.resolve(path.dirname(require.main.filename), 'data', 'basket.json');

const basketRepository = {
	async getAll() {
		return await readJsonFile(FILE_PATH) || [];
	},

	async addNew(id, name, price){
		const product = {
			id: id,
			name: name,
			price: price,
			count: 1
		}
		let inDataBase = await this.inDataBase(id);
		let db = await basketRepository.getAll();
		if ( inDataBase ) {
			await Array.from(db).forEach(item => {
				if (item.id === id) {
					item.count++;
				}
			})
		} else {
			db.push(product);
		}
		writeJsonFile(FILE_PATH, db);
	},

	async inDataBase(id) {
		let inDB = false;
		let db = await basketRepository.getAll();
		await Array.from(db).forEach(item => {
			if ( item.id === id ) {
				inDB = true;
			}
		})
		return inDB
	},

	async remove(id) {
		const db = await basketRepository.getAll();
		let elemID = await this.searchElement(id);
		if ( elemID == -1 ) {
			console.log('Товар не найден.');
			return 1;
		};
		if ( db[elemID].count > 1 ) {
			db[elemID].count -= 1;
		} else {
			db.splice(elemID, 1);
		}
		await writeJsonFile(FILE_PATH, db);
	},

	async searchElement(id) {
		const db = await basketRepository.getAll();
		return db.findIndex(item => item.id === id);
	}
}


module.exports = basketRepository;