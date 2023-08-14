import { Vector2 } from "./vector2.js";
export class BaseNode {
    constructor(position = Vector2.ZERO) {
        this.position = position;
    }
    get inJSON() {
        return JSON.stringify(this.object);
    }
}
