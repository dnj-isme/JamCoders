import { BaseNode } from "../_general/baseNode.js";
import { Vector2 } from "../_general/vector2.js";
export class OperatorNode extends BaseNode {
    get result() { return (this._result)(); }
    constructor(left, right, method, position = Vector2.ZERO) {
        super(position);
        this.left = left;
        this.right = right;
        this.method = method;
        this._result = this.getResult;
    }
}
