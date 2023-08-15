import { LoggingPool } from "../pool/log.js";
import { NumberOperatorType as NumberOperatorType, VariableType } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";
import { NumberNode } from "../variables/numberNode.js";
import { OperatorNode } from "./_operatorNode.js";

declare type leftParam = NumberNode | NumberOperatorNode
declare type rightParam = NumberNode | NumberOperatorNode
declare type methodParam = NumberOperatorType

export class NumberOperatorNode extends OperatorNode {
  constructor(left: leftParam, right: rightParam, method: methodParam, position: Vector2 = Vector2.ZERO) {
    super(left, right, method, position)
  }

  protected getResult(): number {
    let l: number, r: number;

    if(this.left instanceof NumberNode) 
      l = this.left.value as number
    else if (this.left instanceof NumberOperatorNode) 
      l = this.left.result as number
    else {
      LoggingPool.instance.add(this.id, "invalid type at left operand", "error")
      return 0
    }

    if (this.right instanceof NumberNode) 
      r = this.right.value as number
    else if (this.right instanceof NumberOperatorNode) 
      r = this.right.result as number
    else {
      LoggingPool.instance.add(this.id, "invalid type at right operand", "error")
      return 0
    }
  
    switch(this.method) {
      case "add":
        return l + r;
      case "substract":
        return l - r;
      case "multiply":
        return l * r
      case "divide":
        return l / r
      case "max":
        return l > r ? l : r
      case "min":
        return l < r ? l : r
      case "power":
        return Math.pow(l, r)
      case "root":
        return Math.pow(l, 1/r)
      case "round":
        return r > 0 ? parseFloat(l.toFixed(r)) : parseInt(l.toFixed(r))
      default:
        LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for NumberOperatorNode`, "error")
        return 0
    }
  }
  get object(): object {
    return {
      _id: this.id,
      position: this.position.object,
      left: this.left.object,
      right: this.right!.object,
      output: this.result,
    }
  }
}