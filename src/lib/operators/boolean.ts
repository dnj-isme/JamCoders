import { BooleanOperatorType, VariableType } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";
import { OperatorNode } from "./_operatorNode.js";
import { VariableNode } from "../variables/_variableNode.js";

declare type leftParam = VariableNode | OperatorNode
declare type rightParam = VariableNode | OperatorNode
declare type methodParam = BooleanOperatorType

export class BooleanOperatorNode extends OperatorNode {
  constructor(left: leftParam, right: rightParam, method: methodParam, position: Vector2 = Vector2.ZERO) {
    super(left, right, method, position)
  }
  
  protected getResult(): VariableType {
    throw new Error("Method not implemented.");
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