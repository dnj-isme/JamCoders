import { LoggingPool } from "../pool/log.js";
import { Vector2 } from "../_general/vector2.js";
import { NumberNode } from "../variables/numberNode.js";
import { OperatorNode } from "./_operatorNode.js";
export class NumberOperatorNode extends OperatorNode {
    constructor(left, right, method, position = Vector2.ZERO) {
        super(left, right, method, position);
    }
    getResult() {
        let l, r;
        if (this.left instanceof NumberNode)
            l = this.left.value;
        else if (this.left instanceof NumberOperatorNode)
            l = this.left.result;
        else {
            LoggingPool.instance.add(this.id, "invalid type at left operand", "error");
            return 0;
        }
        if (this.right instanceof NumberNode)
            r = this.right.value;
        else if (this.right instanceof NumberOperatorNode)
            r = this.right.result;
        else {
            LoggingPool.instance.add(this.id, "invalid type at right operand", "error");
            return 0;
        }
        switch (this.method) {
            case "add":
                return l + r;
            case "substract":
                return l - r;
            case "multiply":
                return l * r;
            case "divide":
                return l / r;
            case "max":
                return l > r ? l : r;
            case "min":
                return l < r ? l : r;
            case "power":
                return Math.pow(l, r);
            case "root":
                return Math.pow(l, 1 / r);
            default:
                LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for NumberOperatorNode`, "error");
                return 0;
        }
    }
    get object() {
        return {
            position: this.position.object,
            left: this.left.object,
            right: this.right.object,
            output: this.result,
        };
    }
}
