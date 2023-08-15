import { LoggingPool } from "../pool/log.js";
import { TextOperatorType, VariableType } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";
import { VariableNode, getType } from "../variables/_variableNode.js";
import { NumberNode } from "../variables/numberNode.js";
import { TextNode } from "../variables/stringNode.js";
import { OperatorNode } from "./_operatorNode.js";
import { NumberOperatorNode } from "./number.js";
import { Vector2Node } from "../variables/vector2Node.js";

type LeftParam = VariableNode | OperatorNode;
type RightParam = VariableNode | OperatorNode | undefined;

export class TextOperatorNode extends OperatorNode {
  constructor(
    left: LeftParam,
    right: RightParam,
    method: TextOperatorType,
    position: Vector2 = Vector2.ZERO
  ) {
    super(left, right, method, position);
  }

  protected getResult(): number | string {
    try {
      const l = this.getLeftValue();
      const r = this.getRightValue();

      switch (this.method) {
        case "concat":
          switch(getType(r)) {
            case "number":
              LoggingPool.instance.add(this.id, `the right operand with type "${getType(r)}" will be converted to string`, "warning");
            case "text": 
              return `${l}${r}`
            default:
              LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
              return `${l}`
            }
        case "left":
          if(getType(r) != "number") {
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return 0
          }
          return l.substring(0, r as number)
        case "right":
          if(getType(r) != "number") {
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return 0
          }
          return l.substring(l.length - (r as number))
        case "length":
          if(getType(r) != "undefined") {
            LoggingPool.instance.add(this.id, `the right operand will be ignored`, "warning")
          }
          return l.length;
        default:
          LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for TextOperatorNode`, "error")
          return 0
      }
    } catch (error: any) {
      LoggingPool.instance.add(this.id, error.message, "error");
      return -1; // or handle the error as needed
    }
  }

  private getLeftValue(): string {
    if (this.left instanceof VariableNode) {
      return this.left.value!.toString()
    }
    else if (this.left instanceof OperatorNode) {
      return this.left.result!.toString()
    }
    LoggingPool.instance.add(this.id, "invalid type at left operand", "error")
    return ""
  }

  private getRightValue(): number | string | undefined {
    if (this.right instanceof VariableNode) {
      if(this.right instanceof NumberNode) {
        return this.right.value as number
      }
      return this.right.value!.toString()
    }
    else if (this.right instanceof OperatorNode) {
      if(this.right instanceof NumberOperatorNode) {
        return this.right.result as number
      }
      return this.right.result!.toString()
    }
    else if (this.right == undefined) {
      return undefined
    }
    LoggingPool.instance.add(this.id, "invalid type at right operand", "error")
    return ""
  }

  get object(): object {
    return {
      _id: this.id,
      position: this.position.object,
      left: this.left.object,
      right: this.right?.object,
      output: this.result,
    };
  }
}
