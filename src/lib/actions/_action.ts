import { BaseNode } from "../_general/baseNode.js";
import { ActionType } from "../_general/types.js";
import { Vector2 } from "../_general/vector2.js";

export abstract class ActionNode extends BaseNode {

  public next: ActionNode | undefined
  private _type: ActionType

  get type(): ActionType {return this._type}

  public constructor(type: ActionType, position: Vector2 = Vector2.ZERO) {
    super(position)
    this._type = type
  }

  public execute():void {
    this.action()
    this.next?.execute()
  }
  protected abstract action(): void;
}