require("./String+Colors");

module.exports = class SpecData {
    constructor() {
        this.it_counter = 0;
        this.xit_counter = 0;
        this.positive_it_counter = 0;
        this.time_taken = [];
    }

    display() {
        console.log(`● ${this.it_counter + this.xit_counter} tests`.yellow());
        console.log(`✓ ${this.positive_it_counter} passing`.green());
        console.log(`✗ ${this.it_counter - this.positive_it_counter} failing`.red());
        console.log(`- ${this.xit_counter} skipped`.gray());

        const formatted_time = this.time_taken.reduce((acc, next) => acc + next, 0);
        if(formatted_time > 1000000)
            console.log(`★ Finished in ${formatted_time/1000000.0} seconds`.cyan());
        else if(formatted_time > 60000000)
            console.log(`★ Finished in ${formatted_time/60000000.0} minutes`.cyan());
        else
            console.log(`★ Finished in ${formatted_time/1000.0} ms`.cyan());
    }

    add(data) {
        this.it_counter += data.it_counter;
        this.xit_counter += data.xit_counter;
        this.positive_it_counter += data.positive_it_counter;
        this.time_taken += data.time_taken;
    }
}
