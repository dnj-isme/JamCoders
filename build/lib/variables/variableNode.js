import { BaseNode } from "../baseNode.js";
import { Vector2 } from "../vector2.js";
export class VariableNode extends BaseNode {
    constructor(position = Vector2.ZERO) {
        super(position);
        this.value = undefined;
    }
}
