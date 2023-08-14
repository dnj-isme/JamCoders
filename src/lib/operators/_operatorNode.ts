import { BaseNode } from "../_general/baseNode.js";
import { BooleanOperatorType, NumberOperatorType, TextOperatorType, VariableType, Vector2OperatorType } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";
import { VariableNode } from "../variables/_variableNode.js";

declare type leftParam = VariableNode | OperatorNode
declare type rightParam = VariableNode | OperatorNode | undefined
declare type methodParam = TextOperatorType | BooleanOperatorType | Vector2OperatorType | NumberOperatorType

export abstract class OperatorNode extends BaseNode {
  public left: leftParam
  public right: rightParam
  public method: methodParam
  private _result: () => VariableType

  public get result() {return (this._result)()}

  constructor(left: leftParam, right: rightParam, method: methodParam, position: Vector2 = Vector2.ZERO) {
    super(position)
    this.left = left
    this.right = right
    this.method = method
    this._result = this.getResult
  }

  protected abstract getResult(): VariableType
}