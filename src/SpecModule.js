const SpecData = require("./SpecData");

class SpecModule {
    constructor() {
        this.spacing = "";
        this.type = "all";

        this.it_state = true;
        this.failed_it_result = "";

        this.current_file = "";
        this.current_line = -1;

        this.module_data = new SpecData();
        this.before_each_block = () => {};
        this.after_each_block = () => {};
        this.actual = null;
    }

    spec_code() {}

    equals(actual, expected) {
        return actual === expected;
    }

    not_equals(actual, expected) {
        return !this.equals(actual, expected);
    }

    before(block) {
        block();
    }

    before_each(block) {
        this.before_each_block = block;
    }

    after(block) {
        block();
    }

    after_each(block) {
        this.after_each_block = block;
    }

    describe(name, desc) {
        this.spacing += "    ";

        console.log(this.spacing + `\`${name}\``.magenta());
        desc();

        this.spacing = this.spacing.substring(0, this.spacing.length - 4);
    }

    it(name, it) {
        this.spacing += "    ";
        this.before_each_block();

        this.it_state = true;
        this.failed_it_result = "";

        const start_time = performance.now();
        it();
        const total_time = performance.now() - start_time;

        this.module_data.time_taken.push(total_time * 1000.0);
        this.module_data.it_counter++;

        if(this.it_state) {
            this.module_data.positive_it_counter++;

            if(this.type === "all" || this.type === "passing")
                console.log(self.spacing + "✓".green() + " it " + name);
        }
        else if(this.type === "all" || this.type === "failing") {
            console.log(this.spacing + "✗".red() + " it " + name);
            console.log(this.failed_it_result);
        }

        this.after_each_block();
        this.spacing = this.spacing.substring(0, this.spacing.length - 4);
    }

    xit(name, _) {
        this.spacing += "    ";
        this.before_each_block();

        this.module_data.xit_counter++;

        if(this.type === "all" || this.type === "skipped")
            console.log(self.spacing + "- xit \(name) (skipped)".gray());

        this.after_each_block();
        this.spacing = this.spacing.substring(0, this.spacing.length - 4);
    }

    generic_match(matched, error_message) {
        if(!matched) {
            this.it_state = false;
            this.spacing += "    ";
            this.failed_it_result = `${this.spacing}${this.current_file}:${this.current_line}:\n`;
            this.spacing += "    ";
            this.failed_it_result += `${this.spacing} |> ${error_message()}\n`;
            this.spacing = this.spacing.substring(0, this.spacing.length - 8);
        }
    }

    is(expected) {
        this.generic_match(this.equals(this.actual, expected), () => `\`${this.actual}\``.red() + ` should be \`${expected}\``);
    }

    isnot(expected) {
        this.generic_match(this.not_equals(this.actual, expected), () => `\`${this.actual}\``.red() + ` should not be \`${expected}\``);
    }

    equals_to(expected) {
        this.generic_match(this.equals(this.actual, expected), () => `\`${expected}\` expected but got ` + ` \`${this.actual}\``.red());
    }

    does_not_equal_to(expected) {
        this.generic_match(this.not_equals(this.actual, expected), () => `\`${expected}\` must be different from ` + ` \`${this.actual}\``.red());
    }

    is_true() {
        this.generic_match(this.actual, () => `\`${this.actual}\``.red() + " should be true");
    }

    is_false() {
        this.generic_match(!this.actual, () => `\`${this.actual}\``.red() + " should be false");
    }

    is_null() {
        this.generic_match(this.actual === null, () => `\`${this.actual}\``.red() + " should be null");
    }

    isnot_null() {
        this.generic_match(this.actual !== null, () => `\`${this.actual}\``.red() + " should not be null");
    }

    assert_that(actual, file=(require("path").basename(__filename)), line=(new Error().stack.split("\n")[1].split(":")[1])) {
        this.actual = actual;
        this.current_file = file;
        this.current_line = line;

        return this;
    }

    fail(message, file=(require("path").basename(__filename)), line=(new Error().stack.split("\n")[1].split(":")[1])) {
        this.it_state = false;
        this.spacing += "    ";
        this.failed_it_result = `${this.spacing}${file}:${line}:\n`
        this.spacing += "    ";
        this.failed_it_result += this.spacing + "|> " + message.red() + "\n";
        this.spacing = this.spacing.substring(0, this.spacing.length - 8);
    }

    run(type) {
        this.module_data = new SpecData();
        this.type = type;

        console.log(`Module \`${this.constructor.name}\``.module_color());
        this.spec_code();
        console.log("");

        return this.module_data;
    }
}

module.exports = { SpecModule };
