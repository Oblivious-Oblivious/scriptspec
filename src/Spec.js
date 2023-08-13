const SpecData = require("./SpecData");

module.exports = class Spec {
    constructor(modules) {
        this.modules = modules;
        this.data = new SpecData();
    }

    run_spec_suite(type) {
        console.log("\u{001B}[38;5;95m/########### ###########/");
        console.log("\u{001B}[38;5;95m/###### \u{001B}[38;5;89ms\u{001B}[38;5;90mc\u{001B}[38;5;91mr\u{001B}[38;5;92mi\u{001B}[38;5;93mp\u{001B}[38;5;94mt\u{001B}[38;5;95ms\u{001B}[38;5;96mp\u{001B}[38;5;97me\u{001B}[38;5;98mc\u{001B}[0m \u{001B}[38;5;95m#####/");
        console.log("/########### ###########/\u{001B}[0m");
        console.log("");

        for(const m in this.modules)
            this.data.add(m.run(type));

        this.data.display();
    }
}
