import { BooleanOperatorType, VariableType } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";
import { OperatorNode } from "./_operatorNode.js";
import { Log, LoggingPool } from "../pool/log.js";
import { getType } from "../variables/_variableNode.js";
import { BooleanNode } from "../variables/booleanNode.js";

declare type strictParam = BooleanNode | BooleanOperatorNode
declare type relaxedParam = BooleanNode | BooleanOperatorNode | undefined
declare type methodParam = BooleanOperatorType

export class BooleanOperatorNode extends OperatorNode {
  constructor(left: strictParam, right: relaxedParam, method: methodParam, position: Vector2 = Vector2.ZERO) {
    super(left, right, method, position)
  }
  
  protected getResult(): boolean {
    const l = this.getValue(this.left as strictParam, "left")
    const r = this.getValue(this.right as relaxedParam, "right")
    switch(this.method) {
      case "and":
        if(getType(l) == "boolean" && getType(r) == "boolean") return l! && r!
        else {
          LoggingPool.instance.add(this.id, `Either left or right operand has invalid type. Expected: boolean`, "error");
          return false
        }
      case "or":
        if(getType(l) == "boolean" && getType(r) == "boolean") return l! || r!
        else {
          LoggingPool.instance.add(this.id, `Either left or right operand has invalid type. Expected: boolean`, "error");
          return false
        }
      case "xor":
        if(getType(l) == "boolean" && getType(r) == "boolean") return (l! || r!) && !(l! && r!)
        else {
          LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
        }
      case "not":
        if(r) LoggingPool.instance.add(this.id, `the right operand will be ignored`, "warning")
        if(getType(l) == "boolean") return !l
        else {
          LoggingPool.instance.add(this.id, `the left operand has invalid type of "${getType(l)}"`, "error");
          return false
        }
      default:
        LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for BooleanOperatorNode`, "error")
        return false
    }
  }

  private getValue(input: BooleanNode | BooleanOperatorNode | undefined, node: "left" | "right"): boolean | undefined {
    if(input instanceof BooleanNode) {
      return (input as BooleanNode).value as boolean
    }
    else if (input instanceof BooleanOperatorNode) {
      return (input as BooleanOperatorNode).result as boolean
    }
    else if (input == undefined && node == "right") {
      return undefined
    }
    else {
      LoggingPool.instance.add(this.id, `invalid type at ${node} operand`, "error")
      return false
    }
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