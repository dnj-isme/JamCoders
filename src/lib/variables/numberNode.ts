import { Vector2 } from "../_general/vector2.js";
import { NumberOperatorNode } from "../operators/number.js";
import { LoggingPool } from "../pool/log.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode } from "./_variableNode.js";

export class NumberNode extends VariableNode {
  constructor(label: string, value: number | NumberOperatorNode, position: Vector2 = Vector2.ZERO) {
    super(label, "number", position);
    
    if(typeof value == "number") this.value = value as number
    else if(value instanceof NumberOperatorNode) this.value = (value as NumberOperatorNode).result
    else {
      LoggingPool.instance.add(this.id, `Invalid value ${value}`, "error")
      this.value = 0
    }

    if(label !== "") VariablePool.instance.add(label, this)
  }

  get object(): object {
    return {
      _label: this.label,
      position: this.position,
      value: this.value as number,
      type: this.type
    }
  }
}