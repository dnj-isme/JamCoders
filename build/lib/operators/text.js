import { LoggingPool } from "../pool/log.js";
import { Vector2 } from "../_general/vector2.js";
import { getType } from "../variables/_variableNode.js";
import { NumberNode } from "../variables/numberNode.js";
import { TextNode } from "../variables/stringNode.js";
import { OperatorNode } from "./_operatorNode.js";
import { NumberOperatorNode } from "./number.js";
export class TextOperatorNode extends OperatorNode {
    constructor(left, right, method, position = Vector2.ZERO) {
        super(left, right, method, position);
    }
    getResult() {
        try {
            const l = this.getLeftValue();
            const r = this.getRightValue();
            switch (this.method) {
                case "concat":
                    switch (getType(r)) {
                        case "number":
                            LoggingPool.instance.add(this.id, `the right operand with type "${getType(r)}" will be converted to string`, "warning");
                        case "text":
                            return `${l}${r}`;
                        default:
                            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                            return `${l}`;
                    }
                case "left":
                    if (getType(r) != "number") {
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return 0;
                    }
                    return l.substring(0, r);
                case "right":
                    if (getType(r) != "number") {
                        LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
                        return 0;
                    }
                    return l.substring(l.length - r);
                case "length":
                    if (getType(r) != "undefined") {
                        LoggingPool.instance.add(this.id, `the right operand will be ignored`, "warning");
                    }
                    return l.length;
                default:
                    LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for TextOperatorNode`, "error");
                    return 0;
            }
        }
        catch (error) {
            LoggingPool.instance.add(this.id, error.message, "error");
            return -1; // or handle the error as needed
        }
    }
    getLeftValue() {
        if (this.left instanceof TextNode) {
            return this.left.value;
        }
        if (this.left instanceof TextOperatorNode) {
            const result = this.left.result;
            if (getType(result) !== "text") {
                LoggingPool.instance.add(this.id, `the left operand with type "${getType(result)}}" will be converted to string`, "warning");
            }
            return result.toString();
        }
        LoggingPool.instance.add(this.id, "invalid type at left operand", "error");
        return "";
    }
    getRightValue() {
        if (this.right instanceof TextNode)
            return this.right.value;
        if (this.right instanceof NumberNode)
            return this.right.value;
        if (this.right instanceof NumberOperatorNode)
            return this.right.result;
        if (this.right instanceof TextOperatorNode) {
            const result = this.right.result;
            switch (getType(result)) {
                case "undefined":
                    return undefined;
                case "number":
                    return result;
                case "text":
                    return result;
                default:
                    LoggingPool.instance.add(this.id, `the right operand with type "${getType(result)}" will be converted to string`, "warning");
                    return result === null || result === void 0 ? void 0 : result.toString();
            }
        }
        LoggingPool.instance.add(this.id, "invalid type at right operand", "error");
        return "";
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
