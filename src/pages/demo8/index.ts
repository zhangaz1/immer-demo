import {
	produce,
	nothing,
} from 'immer';

const userReducer = produce((draft, action) => {
	switch (action.type) {
		case "renameUser":
			// OK: we modify the current state
			draft.users[action.payload.id].name = action.payload.name
			return draft // same as just 'return'
		case "loadUsers":
			// OK: we return an entirely new state
			return action.payload
		case "adduser-1":
			// NOT OK: This doesn't do change the draft nor return a new state!
			// It doesn't modify the draft (it just redeclares it)
			// In fact, this just doesn't do anything at all
			draft = { users: [...draft.users, action.payload] }
			return
		case "adduser-2":
			// NOT OK: modifying draft *and* returning a new state
			draft.userCount += 1
			return { users: [...draft.users, action.payload] }
		case "adduser-3":
			// OK: returning a new state. But, unnecessary complex and expensive
			return {
				userCount: draft.userCount + 1,
				users: [...draft.users, action.payload]
			}
		case "adduser-4":
			// OK: the immer way
			draft.userCount += 1
			draft.users.push(action.payload)
			return;
		case 'nothing':
			break;
		case 'undefined':
			return undefined;
		case 'immer-nothing':
			return nothing;
		case 'conflict':
			draft.userCount++;
			return {};
	}
});

let state = {
	userCount: 2,
	users: {
		'1': {
			id: 1,
			name: 'zs',
		},
		'2': {
			id: 2,
			name: 'ls',
		},
		push: function (user) {
			this[user.id] = user;
		}
	},
};
console.log(userReducer(state, {
	type: 'renameUser',
	payload: {
		id: 1,
		name: 'xx',
	}
}));

console.log(userReducer(state, {
	type: 'loadUsers',
	payload: {
		userCount: 1,
		users: {
			'3': {
				id: 3,
				name: 'ww',
			}
		}
	},
}));

console.log(userReducer(state, {
	type: 'adduser-4',
	payload: {
		id: 3,
		name: 'xxw',
	},
}));

console.log(userReducer(state, {
	type: 'nothing',
}));

console.log(userReducer(state, {
	type: 'undefined',
}));

console.log(userReducer(state, {
	type: 'immer-nothing',
}));
console.log(nothing);

console.log(state);

console.log(userReducer(state, {
	type: 'conflict',
}))
