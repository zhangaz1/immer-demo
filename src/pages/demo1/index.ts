import produce from 'immer';

class Todo {
	constructor(public name: string, public done: boolean) { }
}

const baseState = [
	new Todo('Learn Typescript', true),
	new Todo('Try immer', false),
];

const nextState = produce(baseState, draftState => {
	draftState.push(new Todo('Tweet about it', true));
});

window.todos = baseState;
window.newTodos = nextState;