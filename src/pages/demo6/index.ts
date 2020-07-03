import {
	produce,
	current,
	original,
} from 'immer';

const base = {
	x: 0,
};

const next = produce(base, draft => {
	draft.x++;
	const orig = original(draft);
	const copy = current(draft);

	console.log(orig.x);
	console.log(copy.x);

	setTimeout(() => {
		console.log(orig.x);
		console.log(copy.x);
	}, 100);

	draft.x++;
	console.log(draft.x);
});

console.log(next.x);