import produce from 'immer';

const byId = produce((draft, action) => {
	switch (action.type) {
		case 'RECEIVE_PRODUCTS':
			action.products.forEach(product => draft[product.id] = product);
	}
});

const baseState = {};
const action = {
	type: 'RECEIVE_PRODUCTS',
	products: [{
		id: 1,
		name: 'book',
	}, {
		id: 2,
		name: 'shoose',
	}],
};

console.log(byId(baseState, action));

const byId2 = produce(
	(draft, action) => {
		switch (action.type) {
			case 'RECEIVE_PRODUCTS':
				action.products.forEach(product => draft[product.id] = product);
		}
	},
	baseState
);

console.log(byId2(baseState, action));