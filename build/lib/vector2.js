class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /** Get the Vector at plain object format */
    get object() { return { x: this.x, y: this.y }; }
    /** Get the Vector at JSON format */
    get inJSON() { return JSON.stringify(this.object); }
    /**
     * Creates a Vector2 that represents a square
     * @param size The size of the square
     * @returns Vector2(size, size)
     */
    static square(size) { return new Vector2(size, size); }
    /**
     * Converts JSON string to Vector2. It should have x and y format property inside.
     * @param json the JSON input in string
     * @returns the Vector2 of the input JSON
     */
    static fromJSON(json) { const data = JSON.parse(json); return new Vector2(data.x, data.y); }
}
/**
 * Equivalent to new Vector2(0, 0)
 */
Vector2.ZERO = (function () { return new Vector2(0, 0); })();
/**
 * Equivalent to new Vector2(1, 1)
 */
Vector2.ONE = (function () { return new Vector2(1, 1); })();
/**
 * Returns a vector that points upward, The direction is relative to the Canvas Perspective
 */
Vector2.UP = (function () { return new Vector2(0, -1); })();
/**
 * Returns a vector that points downward, The direction is relative to the Canvas Perspective
 */
Vector2.DOWN = (function () { return new Vector2(0, 1); })();
/**
 * Returns a vector that points to the left, The direction is relative to the Canvas Perspective
 */
Vector2.LEFT = (function () { return new Vector2(-1, 0); })();
/**
 * Returns a vector that points to the right, The direction is relative to the Canvas Perspective
 */
Vector2.RIGHT = (function () { return new Vector2(1, 0); })();
export { Vector2 };
