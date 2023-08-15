import { BaseNode } from "../../_general/baseNode.js";
import { Vector2 } from "../../_general/vector2.js";
import { OperatorNode } from "../../operators/_operatorNode.js";
import { LoggingPool } from "../../pool/log.js";
import { VariableNode, getType } from "../_variableNode.js";
import { NumberNode } from "../numberNode.js";
import { CollectionNode } from "./collectionNode.js";

export class CollectionSelectorNode extends BaseNode {
  private _collection: CollectionNode
  private _index: number

  get result(): VariableNode | undefined {
    if(this._index == -1) {
      LoggingPool.instance.add(this.id, `Using -1 as index. Possible issue might occur related to index parameter`, "error")
      return undefined
    }
    return this._collection.values[this._index];
  }

  constructor(collection: CollectionNode, index: number | NumberNode | OperatorNode, position: Vector2 = Vector2.ZERO) {
    super(position)
    this._collection = collection

    let temp: any = -1;
    if (index instanceof VariableNode) {
      temp = index.value
    }
    else if (index instanceof OperatorNode) {
      temp = index.result
    }
    else {
      temp = index
    }

    if(getType(temp) !== "number") {
      LoggingPool.instance.add(this.id, `Invalid index of ${temp}!`, "error")
      temp = -1;
    }
    this._index = temp;
  }

  get object(): object {
    return {
      _id: this.id,
      position: this.position,
      index: this._index,
      result: this.result
    }
  }
}