import { BaseNode } from "../../_general/baseNode.js";
import { VariableTypeString } from "../../_general/types.js";
import { Vector2 } from "../../_general/vector2.js";
import { LoggingPool } from "../../pool/log.js";
import { VariableNode } from "../_variableNode.js";

declare type CollectionType = VariableTypeString | "any"

export class CollectionNode extends BaseNode {
  public values: VariableNode[]
  private _type: CollectionType;
  private _label: string;

  public get type(): string {return this._type}

  public get label(): string {return this._label}

  constructor(label: string, type: CollectionType, position: Vector2 = Vector2.ZERO) {
    super(position);
    this._label = label;
    this._type = type;
    this.values = []
  }

  public add(node: VariableNode) {
    if(this.type == node.type || this.type == "any") {
      this.values.push(node)
    }
    else {
      LoggingPool.instance.add(this.id, `Attempt to add "${node.type}" variable to "${this.type}" collection. Use collection with "any" type to add any node to the collection`, "error")
    }
  }

  get object(): object {
    return {
      _id: this.id,
      label: this.label,
      position: this.position,
      values: this.values.map((data) => data.object),
      type: this.type
    }
  }
}