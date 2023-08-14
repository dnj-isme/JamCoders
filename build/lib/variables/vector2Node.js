import { Vector2 } from "../_general/vector2.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode } from "./_variableNode.js";
export class Vector2Node extends VariableNode {
    constructor(label, value = Vector2.ZERO, position = Vector2.ZERO) {
        super(label, "vector2", position);
        this.value = value;
        if (label !== "")
            VariablePool.instance.add(label, this);
    }
    get object() {
        return {
            _label: this.label,
            position: this.position,
            value: this.value.object,
            type: this.type
        };
    }
}
