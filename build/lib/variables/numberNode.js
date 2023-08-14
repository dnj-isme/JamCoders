import { Vector2 } from "../_general/vector2.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode } from "./_variableNode.js";
export class NumberNode extends VariableNode {
    constructor(label, value = 0, position = Vector2.ZERO) {
        super(label, "number", position);
        this.value = value;
        if (label !== "")
            VariablePool.instance.add(label, this);
    }
    get object() {
        return {
            _label: this.label,
            position: this.position,
            value: this.value,
            type: this.type
        };
    }
}
