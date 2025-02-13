import { HashMap } from "./hashmap.js";

const map = new HashMap();
map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");
map.set("lion", "golden");

console.log(map.getLength());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
console.log(map);

map.set("apple", "blue");
map.set("grape", "green");
map.set("kite", "red");
console.log(map.getLength());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());

map.set("moon", "silver");

console.log(map.get("apple"));
console.log(map.get("testing"));
console.log(map.has("hat"));
console.log(map.has("testing"));

console.log(map.remove("apple"));
console.log(map.entries());
console.log(map.get("apple"));
console.log(map);
