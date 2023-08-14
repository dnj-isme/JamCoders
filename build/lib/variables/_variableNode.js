import { BaseNode } from "../_general/baseNode.js";
import { Vector2 } from "../_general/vector2.js";
export class VariableNode extends BaseNode {
    get type() { return this._type; }
    get label() { return this._label; }
    constructor(label, type, position = Vector2.ZERO) {
        super(position);
        this._label = label;
        this._type = type;
        this.value = undefined;
    }
}
export function getType(variable) {
    switch (typeof variable) {
        case "string": return "text";
        case "number": return "number";
        case "bigint": return "number";
        case "boolean": return "boolean";
        case "symbol": return "undefined";
        case "undefined": return "undefined";
        case "object": return variable.x && variable.y ? "vector2" : "undefined";
        case "function": return "undefined";
    }
}
