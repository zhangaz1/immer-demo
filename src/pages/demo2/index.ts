// In your application's entrypoint
import { enableMapSet } from "immer"

enableMapSet()

// ...later
import produce from "immer"

const usersById_v1 = new Map([
	["michel", { name: "Michel Weststrate", country: "NL" }]
]);

const usersById_v2 = produce(usersById_v1, draft => {
	draft.get("michel").country = "UK"
});

// expect(usersById_v1.get("michel").country).toBe("NL")
// expect(usersById_v2.get("michel").country).toBe("UK")

// usersById_v1.get('michel').country === 'NL';

console.log(usersById_v1);
console.log(usersById_v2);