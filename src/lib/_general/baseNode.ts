import { NodePool } from "../pool/node.js";
import { Vector2 } from "./vector2.js";

export abstract class BaseNode {
  public position: Vector2
  private _id: string

  public get id() {return this._id}

  constructor(position: Vector2 = Vector2.ZERO) {
    this.position = position;
    this._id = crypto.randomUUID()
    NodePool.instance.add(this.id, this)
  }

  abstract get object(): object;
  get inJSON(): string {
    return JSON.stringify(this.object)
  }
}