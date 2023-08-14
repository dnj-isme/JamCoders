import { Vector2 } from "../_general/vector2.js";
import { OperatorNode } from "../operators/_operatorNode.js";
import { BooleanOperatorNode } from "../operators/boolean.js";
import { ComparatorOperatorNode } from "../operators/comparator.js";
import { LoggingPool } from "../pool/log.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode } from "./_variableNode.js";

export class BooleanNode extends VariableNode {
  constructor(label: string, value: boolean | BooleanOperatorNode | ComparatorOperatorNode, position: Vector2 = Vector2.ZERO) {
    super(label, "boolean", position);
    if(typeof value == "boolean") {
      this.value = value
    }
    else if (value instanceof BooleanOperatorNode || value instanceof ComparatorOperatorNode) {
      this.value = (value as OperatorNode).result as boolean
    }
    else {
      LoggingPool.instance.add(this.id, `Invalid value ${value}`, "error")
      this.value = false
    }
    if(label !== "") VariablePool.instance.add(label, this)
  }

  get object(): object {
    return {
      _label: this.label,
      position: this.position,
      value: this.value as boolean,
      type: this.type
    }
  }
}