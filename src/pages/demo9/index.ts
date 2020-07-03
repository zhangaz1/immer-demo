import {
	produce,
	Draft,
	castDraft,
	castImmutable,
} from 'immer';

interface State {
	readonly x: number;
}

const state: State = {
	x: 0,
};

const increment = produce((draft: Draft<State>, inc: number) => {
	draft.x += inc;
});

const newState = increment(state, 5);

console.log(state, newState);
// newState.x = 8;
state.x = 9;
console.log(state, newState);




type Todo = { readonly done: boolean }

type State2 = {
	readonly finishedTodos: readonly Todo[]
	readonly unfinishedTodos: readonly Todo[]
}

function markAllFinished(state: State2) {
	return produce(state, draft => {
		// draft.finishedTodos = state.unfinishedTodos;
		draft.finishedTodos = castDraft(state.unfinishedTodos);
	})
}

const state2: State2 = {
	finishedTodos: [],
	unfinishedTodos: [{
		done: false,
	}]
};
const nextState2 = markAllFinished(state2);
console.log(nextState2);

state2.finishedTodos.push({ done: false, });
// nextState2.finishedTodos.push({ done: false, });
// castDraft(nextState2).finishedTodos.push({ done: false });