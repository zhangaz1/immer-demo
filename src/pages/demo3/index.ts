import produce from 'immer';

const mapper = produce((draft, index) => {
	draft.index = index;
});

const data = [{}, {}, {}];
const data2 = data.map(mapper);

console.log(data, data2);