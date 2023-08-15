import { Vector2 } from "../_general/vector2.js";
import { OperatorNode } from "../operators/_operatorNode.js";
import { TextOperatorNode } from "../operators/text.js";
import { VariablePool } from "../pool/variable.js";
import { VariableNode, getType } from "./_variableNode.js";

export class TextNode extends VariableNode {
  constructor(label: string, value: string | OperatorNode, position: Vector2 = Vector2.ZERO) {
    super(label, "text", position);
    if(typeof value == "string") this.value = this._defaultValue = value as string
    else this.value = this._defaultValue = (value as OperatorNode).result!.toString()
    if(label !== "") VariablePool.instance.add(label, this)
  }

  get object(): object {
    return {
      _id: this.id,
      label: this.label,
      position: this.position,
      value: this.value as string,
      type: this.type
    }
  }
}