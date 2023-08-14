import { Vector2 } from "../_general/vector2.js";
import { LoggingPool } from "../pool/log.js";
import { getType } from "../variables/_variableNode.js";
import { NumberNode } from "../variables/numberNode.js";
import { Vector2Node } from "../variables/vector2Node.js";
import { OperatorNode } from "./_operatorNode.js";
import { NumberOperatorNode } from "./number.js";
// export declare type Vector2OperatorType = "add" | "substract" | "multiply" | "divide" | "magnitude" | "normalize" | "dot"
export class Vector2OperatorNode extends OperatorNode {
    constructor(left, right, method, position = Vector2.ZERO) {
        super(left, right, method, position);
    }
    getResult() {
        const l = this.getLeftResult();
        const r = this.getRightResult();
        switch (this.method) {
            case "add":
                switch (getType(r)) {
                    case "number":
                        return new Vector2(l.x + r, l.y + r);
                    case "vector2":
                        return new Vector2(l.x + r.x, l.y + r.y);
                    default:
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return Vector2.ZERO;
                }
            case "substract":
                switch (getType(r)) {
                    case "number":
                        return new Vector2(l.x - r, l.y - r);
                    case "vector2":
                        return new Vector2(l.x - r.x, l.y - r.y);
                    default:
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return Vector2.ZERO;
                }
            case "distance":
                switch (getType(r)) {
                    case "vector2":
                        return Math.sqrt(Math.pow(l.x - r.x, 2) + Math.pow(l.y - r.y, 2));
                    default:
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return Vector2.ZERO;
                }
            case "multiply":
                switch (getType(r)) {
                    case "number":
                        return new Vector2(l.x * r, l.y * r);
                    default:
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return Vector2.ZERO;
                }
            case "divide":
                switch (getType(r)) {
                    case "number":
                        return new Vector2(l.x / r, l.y / r);
                    default:
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return Vector2.ZERO;
                }
            case "magnitude":
                if (r)
                    LoggingPool.instance.add(this.id, `the right operand will be ignored`, "warning");
                return Math.sqrt(Math.pow(l.x, 2) + Math.pow(l.y, 2));
            case "normalize":
                const mag = Math.sqrt(Math.pow(l.x, 2) + Math.pow(l.y, 2));
                return new Vector2(l.x / mag, l.y / mag);
            case "dot":
                switch (getType(r)) {
                    case "vector2":
                        return l.x * r.x + l.y * r.y;
                    default:
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return Vector2.ZERO;
                }
            case "reverse":
                if (r)
                    LoggingPool.instance.add(this.id, `the right operand will be ignored`, "warning");
                return new Vector2(-l.x, -l.y);
            default:
                LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for Vector2OperatorNode`, "error");
                return Vector2.ZERO;
        }
    }
    getRightResult() {
        if (this.right instanceof Vector2Node) {
            return this.right.value;
        }
        else if (this.right instanceof Vector2OperatorNode) {
            return this.right.result;
        }
        else if (this.right instanceof NumberNode) {
            return this.right.value;
        }
        else if (this.right instanceof NumberOperatorNode) {
            return this.right.result;
        }
        else
            return undefined;
    }
    getLeftResult() {
        if (this.left instanceof Vector2Node) {
            return this.left.value;
        }
        else if (this.left instanceof Vector2OperatorNode) {
            return this.left.result;
        }
        else {
            LoggingPool.instance.add(this.id, "invalid type at left operand", "error");
            return Vector2.ZERO;
        }
    }
    get object() {
        var _a;
        return {
            position: this.position.object,
            left: this.left.object,
            right: (_a = this.right) === null || _a === void 0 ? void 0 : _a.object,
            output: this.result,
        };
    }
}
