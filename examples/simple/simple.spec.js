const { SpecModule } = require("../../src/SpecModule");

// function sleep(delay) {
//     var start = new Date().getTime();
//     while (new Date().getTime() < start + delay);
// }

class SimpleTestClass {
    constructor() {
        this.i = -1;
        this.d = 0;
        this.s = "";
    }

    debug_msg() {
        console.log("This is called before all tests");
    }

    teardown_msg() {
        console.log("This is called after all tests");
    }

    initializer() {
        this.i = 1;
        this.d = 2.42;
        this.s = "str";
    }

    destructor() {
        this.i = -1;
        this.d = 0;
        this.s = "";
    }
}

class cDataLib extends SpecModule {
    spec_code() {
        const s = new SimpleTestClass();

        this.describe("scriptspec functions", () => {
            this.before(() => {
                s.debug_msg();
            });

            this.before_each(() => {
                s.initializer();
            });

            this.after_each(() => {
                s.destructor();
            });

            this.it("succeeds `assert_that`", () => {
                this.assert_that(1).is(1);
                // sleep(2000);
            });
            this.it("fails `assert_that`", () => {
                this.assert_that(1).isnot(1);
            });

            this.it("succeeds testing an int", () => {
                this.assert_that(1).equals_to(1);
            });
            this.it("fails testing an int", () => {
                this.assert_that(2).equals_to(3);
            });

            this.xit("skips that test", () => {
                this.assert_that(42).is("the meaning of life");
            });

            this.it("succeeds testing does_not_equal_to", () => {
                this.assert_that(42).does_not_equal_to(41);
            });
            this.it("fails testing does_not_equal_to", () => {
                this.assert_that(42).does_not_equal_to(42);
            });

            this.it("succeeds is_null", () => {
                this.assert_that(null).is_null();
            });
            this.it("fails is_null", () => {
                this.assert_that(42).is_null();
            });

            this.it("succeeds isnot_null", () => {
                this.assert_that(42).isnot_null();
            });
            this.it("fails isnot_null", () => {
                this.assert_that(null).isnot_null();
            });

            this.it("succeeds assert_true", () => {
                this.assert_that(true).is_true();
            });
            this.it("fails assert_true", () => {
                this.assert_that(false).is_true();
            });

            this.it("succeeds assert_false", () => {
                this.assert_that(false).is_false();
            });
            this.it("fails assert_false", () => {
                this.assert_that(true).is_false();
            });

            this.it("just fails", () => {
                this.fail("This is the fail message");
            });

            this.after(() => {
                s.teardown_msg();
            });
        });
    }
}

class second extends SpecModule {
    spec_code() {
        this.describe("DESC 1", () => {
            this.it("before on desc 1", () => {
                this.assert_that(42).isnot(69);
            });

            this.describe("DESC 2", () => {
                this.describe("DESC 3", () => {
                    this.it("does on 3", () => {
                        this.assert_that(3).is(3);
                    });
                });
                this.it("does on 2", () => {
                    this.assert_that(2).is(2);
                });
            });
            this.it("does on 1", () => {
                this.assert_that(1).is(1);
            });
        });

        this.describe("Array Assertions", () => {
            const a = [1,2,3,4,5];
            const b = [7,7,7,7,7];
            const c = [1,2,3,4];

            const aa = [1.1, 2.2, 3.3, 4.4, 5.5];
            const bb = [7.7, 7.7, 7.7, 7.7, 7.7];
            const cc = [1.1, 2.2, 3.3, 4.4];

            const aaa = ["a", "b", "c", "d", "e"];
            const bbb = ["g", "g", "g", "g", "g"];
            const ccc = ["a", "b", "c", "d"];

            this.it("succeeds testing an int array", () => {
                const my_arr = [1, 2, 3, 4, 5];
                this.assert_that(my_arr).equals_to(a);
            });
            this.it("fails testing an int array", () => {
                this.assert_that(a).equals_to(b);
                this.assert_that(b).equals_to(c);
            });

            this.it("succeeds testing a double array", () => {
                const my_arr2 = [1.1, 2.2, 3.3, 4.4, 5.5];
                this.assert_that(my_arr2).equals_to(aa);
            });
            this.it("fails testing a double array", () => {
                this.assert_that(aa).equals_to(bb);
                this.assert_that(bb).equals_to(cc);
            });

            this.it("fails testing a string array", () => {
                const my_arr3 = ["a", "b", "c", "d", "e"];
                this.assert_that(my_arr3).equals_to(aaa);
            });
            this.it("fails testing a string array", () => {
                this.assert_that(aaa).equals_to(bbb);
                this.assert_that(bbb).equals_to(ccc);
            });
        });
    }
}

module.exports = {
    cDataLib,
    second,
};
