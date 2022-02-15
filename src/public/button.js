// function fetch request
async function basketPostInit(id, name, price) {
	await fetch('/catalog', {
		method: 'POST',
		body: JSON.stringify({
			id: `${id}`,
			name: `${name}`,
			price: `${price}`
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

async function basketRemoveInit(id) {
	const target = document.getElementById(id);
	const targetCount = target.querySelector('.basket-item__count').innerText;
	const targetPrice = target.querySelector('.basket-item__price').innerText;
	if ( targetCount > 1 ) {
		renderChangeItem(id);
		renderResultChange(targetPrice);
		renderBasketCounterChange();
	} else {
		target.remove();
		renderResultChange(targetPrice);
		renderBasketCounterChange();
	}
	await fetch(`/basket/remove/${id}`, {
		method: 'POST'
	});
}

function renderBasketCounterChange() {
	const parent = document.querySelector('.basket-counter');

	let counter = document.querySelector('.basket-counter__text');
	counter.innerText = counter.innerText - 1;

	let newCounter = document.createElement('p');
	newCounter.classList.add('basket-counter__text');
	newCounter.innerText = counter.innerText;

	counter.remove();

	parent.appendChild(newCounter);
}

function renderResultChange(difference) {
	const parent = document.querySelector('.basket-results');
	const result = document.querySelector('.basket-results__text');

	difference = difference.replace('$', '');

	let resultText = result.innerText;
	resultText = resultText.replace('$', '');

	resultText -= difference;

	result.remove();

	let newResult = document.createElement('p');
	newResult.classList.add('basket-results__text');
	newResult.innerText = `${resultText}$`;
	parent.appendChild(newResult);
}

function renderChangeItem(id) {
	const parent = document.querySelector('.basket-list');
	const target = document.getElementById(id);
	const targetName = target.querySelector('.basket-item__name').innerText;
	const targetCost = target.querySelector('.basket-item__price').innerText;

	let targetCount = target.querySelector('.basket-item__count').innerText;

	targetCount -= 1;

	target.remove();

	let name = document.createElement('p');
	name.classList.add('basket-item__name');
	name.innerText = targetName;

	let newCount = document.createElement('p');
	newCount.classList.add('basket-item__count');
	newCount.innerText = targetCount;

	let price = document.createElement('p');
	price.classList.add('basket-item__price');
	price.innerText = targetCost;

	let item = document.createElement('div');
	item.classList.add('basket-item');
	item.setAttribute('id', id);
	
	let button = document.createElement('button');
	button.classList.add('basket-item__remove');
	button.onclick = () => basketRemoveInit(id);
	
	let image = document.createElement('img');
	image.src = 'img/remove-button.svg';
	image.alt = 'delete button';

	button.appendChild(image);

	item.appendChild(name);
	item.appendChild(newCount);
	item.appendChild(price);
	item.appendChild(button);

	parent.appendChild(item);
}