import { Vector2 } from "../_general/vector2.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode } from "./_variableNode.js";

export class TextNode extends VariableNode {
  constructor(label: string, value: string = "", position: Vector2 = Vector2.ZERO) {
    super(label, "text", position);
    this.value = value;
    if(label !== "") VariablePool.instance.add(label, this)
  }

  get object(): object {
    return {
      _label: this.label,
      position: this.position,
      value: this.value as string,
      type: this.type
    }
  }
}