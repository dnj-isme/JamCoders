import { LoggingPool } from "./log.js";
class VariablePool {
    static get instance() {
        if (this._instance == null)
            this._instance = new VariablePool();
        return this._instance;
    }
    static report() {
        const variables = VariablePool.instance.collection;
        for (let i = 0; i < variables.length; i++) {
            console.log(variables[i]);
        }
    }
    constructor() {
        this.variableList = new Map();
    }
    add(label, value) {
        if (this.variableList.has(label)) {
            LoggingPool.instance.add(VariablePool.id, `Duplicate label "${label}"`, "error");
            return;
        }
        this.variableList.set(label, value);
    }
    clear() {
        this.variableList.clear();
    }
    find(label) {
        const res = this.variableList.get(label);
        if (!res) {
            LoggingPool.instance.add(VariablePool.id, `Variable node with label ${label} is not exists!`, "error");
        }
        return res;
    }
    get labels() {
        return Array.from(this.variableList, ([key, value], idx) => {
            return key;
        });
    }
    get variables() {
        return Array.from(this.variableList, ([key, value], idx) => {
            return value;
        });
    }
    get collection() {
        return Array.from(this.variableList, ([label, variable], _) => {
            return { label, variable };
        });
    }
}
VariablePool.id = "variable_pool";
export { VariablePool };
