import { Vector2 } from "./vector2.js";
export class BaseNode {
    get id() { return this._id; }
    constructor(position = Vector2.ZERO) {
        this.position = position;
        this._id = crypto.randomUUID();
    }
    get inJSON() {
        return JSON.stringify(this.object);
    }
}
