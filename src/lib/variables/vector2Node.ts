import { Vector2 } from "../_general/vector2.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode } from "./_variableNode.js";

export class Vector2Node extends VariableNode {
  constructor(label: string, value: Vector2 = Vector2.ZERO, position: Vector2 = Vector2.ZERO) {
    super(label, "vector2", position);
    this.value = value;
    if(label !== "") VariablePool.instance.add(label, this)
  }

  get object(): object {
    return {
      _label: this.label,
      position: this.position,
      value: (this.value as Vector2).object,
      type: this.type
    }
  }
}