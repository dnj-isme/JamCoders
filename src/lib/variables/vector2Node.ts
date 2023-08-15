import { Vector2 } from "../_general/vector2.js";
import { Vector2OperatorNode } from "../operators/vector2.js";
import { LoggingPool } from "../pool/log.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode, getType } from "./_variableNode.js";

export class Vector2Node extends VariableNode {
  constructor(label: string, value: Vector2 | Vector2OperatorNode, position: Vector2 = Vector2.ZERO) {
    super(label, "vector2", position);
    if(value instanceof Vector2) {
      this.value = this._defaultValue = value
    }
    else if (value instanceof Vector2OperatorNode) {
      this.value = this._defaultValue = value.result
    }
    else {
      LoggingPool.instance.add(this.id, `Invalid value ${value}`, "error")
      this.value = this._defaultValue = false
    }
    if(label !== "") VariablePool.instance.add(label, this)
  }

  get object(): object {
    return {
      _id: this.id,
      label: this.label,
      position: this.position,
      value: (this.value as Vector2).object,
      type: this.type
    }
  }
}