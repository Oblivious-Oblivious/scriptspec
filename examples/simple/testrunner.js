const Spec = require("../../src/Spec");
const { cDataLib, second } = require("./simple.spec");

const stuff = new cDataLib();
stuff.run();
console.log(stuff);

const stuff2 = new second();
stuff2.run();
console.log(stuff2)

// new Spec([
//     // new cDataLib(),
//     // new second(),
// ]).run_spec_suite("all");

console.log("All tests passed!");
