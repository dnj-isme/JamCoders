import { BaseNode } from "../_general/baseNode.js";
import { VariableType, VariableTypeString } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";

export abstract class VariableNode extends BaseNode {
  public value: VariableType
  private _type: string;
  private _label: string;
  protected _defaultValue: VariableType

  public get type(): string {return this._type}

  public get label(): string {return this._label}

  constructor(label: string, type: VariableTypeString, position: Vector2 = Vector2.ZERO) {
    super(position);
    this._label = label;
    this._type = type;
    this.value = undefined
    this._defaultValue = undefined
  }

  refresh() {
    this.value = this._defaultValue
  }
}

export function getType(variable: VariableType): VariableTypeString {
  switch(typeof variable) {
    case "string": return "text"
    case "number": return "number"
    case "bigint": return "number"
    case "boolean": return "boolean"
    case "symbol": return "undefined"
    case "undefined": return "undefined"
    case "object": return variable.x && variable.y ? "vector2" : "undefined"
    case "function": return "undefined"
  }
}