import {
	produce,
	current,
	original,
	isDraft,
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
	console.log(isDraft(orig));
	console.log(isDraft(copy));

	setTimeout(() => {
		console.log(orig.x);
		console.log(copy.x);
	}, 100);

	draft.x++;
	console.log(draft.x);

	console.log(isDraft(draft));
	console.log(isDraft(draft.x));
});

console.log(next.x);
console.log(isDraft(next));