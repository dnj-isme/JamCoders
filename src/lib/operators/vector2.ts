import { VariableType, Vector2OperatorType } from "../_general/types.js"
import { Vector2 } from "../_general/vector2.js"
import { Log, LoggingPool } from "../pool/log.js"
import { getType } from "../variables/_variableNode.js"
import { NumberNode } from "../variables/numberNode.js"
import { Vector2Node } from "../variables/vector2Node.js"
import { OperatorNode } from "./_operatorNode.js"
import { NumberOperatorNode } from "./number.js"

declare type leftParam = Vector2Node | Vector2OperatorNode
declare type rightParam = Vector2Node | NumberNode | NumberOperatorNode | Vector2OperatorNode | undefined
declare type methodParam = Vector2OperatorType

export class Vector2OperatorNode extends OperatorNode {
  constructor(left: leftParam, right: rightParam, method: methodParam, position: Vector2 = Vector2.ZERO) {
    super(left, right, method, position)
  }
  protected getResult(): Vector2 | number {
    const l = this.getLeftResult()
    const r = this.getRightResult()

    switch(this.method) {
      case "add":
        switch(getType(r)) {
          case "number":
            return new Vector2(l.x + (r as number), l.y + (r as number))
          case "vector2":
            return new Vector2(l.x + (r as Vector2).x, l.y + (r as Vector2).y)
          default:
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return Vector2.ZERO
        }
      case "substract":
        switch(getType(r)) {
          case "number":
            return new Vector2(l.x - (r as number), l.y - (r as number))
          case "vector2":
            return new Vector2(l.x - (r as Vector2).x, l.y - (r as Vector2).y)
          default:
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return Vector2.ZERO
        }
      case "distance":
        switch(getType(r)) {
          case "vector2":
            return Math.sqrt(Math.pow(l.x - (r as Vector2).x, 2) + Math.pow(l.y - (r as Vector2).y, 2))
          default:
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return Vector2.ZERO
        }
      case "multiply":
        switch(getType(r)) {
          case "number":
            return new Vector2(l.x * (r as number), l.y * (r as number))
          default:
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return Vector2.ZERO
        }
      case "divide":
        switch(getType(r)) {
          case "number":
            return new Vector2(l.x / (r as number), l.y / (r as number))
          default:
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return Vector2.ZERO
        }
      case "magnitude":
        if(r) LoggingPool.instance.add(this.id, `the right operand will be ignored`, "warning")
        return Math.sqrt(Math.pow(l.x, 2) + Math.pow(l.y, 2))
      case "normalize":
        const mag = Math.sqrt(Math.pow(l.x, 2) + Math.pow(l.y, 2))
        return new Vector2(l.x / mag, l.y / mag)
      case "dot":
        switch(getType(r)) {
          case "vector2":
            return l.x * (r as Vector2).x + l.y * (r as Vector2).y
          default:
            LoggingPool.instance.add(this.id, `the right operand has invalid type of "${getType(r)}"`, "error");
            return Vector2.ZERO
        }
      case "reverse":
        if(r) LoggingPool.instance.add(this.id, `the right operand will be ignored`, "warning")
        return new Vector2(-l.x, -l.y)
      default:
        LoggingPool.instance.add(this.id, `Unsupported method "${this.method}" for Vector2OperatorNode`, "error")
        return Vector2.ZERO
    }
  }

  getRightResult(): Vector2 | number | undefined {
    if(this.right instanceof Vector2Node) {
      return this.right.value as Vector2
    }
    else if (this.right instanceof Vector2OperatorNode) {
      return this.right.result as Vector2
    }
    else if(this.right instanceof NumberNode) {
      return this.right.value as number
    }
    else if (this.right instanceof NumberOperatorNode) {
      return this.right.result as number
    } 
    else return undefined
  }

  getLeftResult(): Vector2{
    if(this.left instanceof Vector2Node) {
      return this.left.value as Vector2
    }
    else if (this.left instanceof Vector2OperatorNode) {
      return this.left.result as Vector2
    }
    else {
      LoggingPool.instance.add(this.id, "invalid type at left operand", "error")
      return Vector2.ZERO
    }
  }

  get object(): object {
    return {
      position: this.position.object,
      left: this.left.object,
      right: this.right?.object,
      output: this.result,
    };
  }
}