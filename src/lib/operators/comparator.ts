import { BooleanOperatorType, ComparatorOperatorType, VariableType } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";
import { OperatorNode } from "./_operatorNode.js";
import { LoggingPool } from "../pool/log.js";
import { VariableNode, getType } from "../variables/_variableNode.js";

declare type strictParam = VariableNode | OperatorNode
declare type relaxedParam = VariableNode | OperatorNode | undefined
declare type methodParam = ComparatorOperatorType

export class ComparatorOperatorNode extends OperatorNode {
  constructor(left: strictParam, right: relaxedParam, method: methodParam, position: Vector2 = Vector2.ZERO) {
    super(left, right, method, position)
  }
  
  protected getResult(): boolean {
    const l = this.getValue(this.left as strictParam, "left")
    const r = this.getValue(this.right as relaxedParam, "right")
    switch(this.method) {
      case "equal":
        if(getType(l) == "vector2" && getType(r) == "vector2") {
          return (l as Vector2).equal(r as Vector2)
        }
        return l === r
      case "not equal":
        if(getType(l) == "vector2" && getType(r) == "vector2") {
          return !(l as Vector2).equal(r as Vector2)
        }
        return l !== r
      case ">":
        if(getType(l) == "number" && getType(r) == "number") {
          return (l as number) > (r as number)
        }
        LoggingPool.instance.add(this.id, `Either left or right operand has invalid type. Expected: number`, "error");
        return false
      case "<":
        if(getType(l) == "number" && getType(r) == "number") {
          return (l as number) < (r as number)
        }
        LoggingPool.instance.add(this.id, `Either left or right operand has invalid type. Expected: number`, "error");
        return false
      case "<=":
        if(getType(l) == "number" && getType(r) == "number") {
          return (l as number) <= (r as number)
        }
        LoggingPool.instance.add(this.id, `Either left or right operand has invalid type. Expected: number`, "error");
        return false
      case ">=":
        if(getType(l) == "number" && getType(r) == "number") {
          return (l as number) >= (r as number)
        }
        LoggingPool.instance.add(this.id, `Either left or right operand has invalid type. Expected: number`, "error");
        return false
      default:
        LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for ComparatorOperatorNode`, "error")
        return false
    }
  }

  private getValue(input: VariableNode | OperatorNode | undefined, node: "left" | "right"): VariableType {
    if(input instanceof VariableNode) {
      return (input as VariableNode).value
    }
    else if (input instanceof OperatorNode) {
      return (input as OperatorNode).result
    }
    else if (input == undefined && node == "right") {
      return undefined
    }
    else {
      LoggingPool.instance.add(this.id, `invalid type at ${node} operand`, "error")
      return undefined
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