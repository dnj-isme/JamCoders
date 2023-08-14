export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /** Get the Vector at plain object format */
  get object(): object {return {x: this.x, y: this.y}}
  /** Get the Vector at JSON format */
  get inJSON(): string {return JSON.stringify(this.object)}

  public toString(): string {
    return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`
  }

  public equal(target: Vector2): boolean {
    return this.x == target.x && this.y == target.y
  }

  /**
   * Equivalent to new Vector2(0, 0)
   */
  static readonly ZERO: Vector2 = (function(): Vector2 {return new Vector2(0, 0)})()
  /**
   * Equivalent to new Vector2(1, 1)
   */
  static readonly ONE: Vector2 = (function(): Vector2 {return new Vector2(1, 1)})()
  /**
   * Returns a vector that points upward, The direction is relative to the Canvas Perspective
   */
  static readonly UP: Vector2 = (function(): Vector2 {return new Vector2(0, -1)})()
  /**
   * Returns a vector that points downward, The direction is relative to the Canvas Perspective
   */
  static readonly DOWN: Vector2 = (function(): Vector2 {return new Vector2(0, 1)})()
  /**
   * Returns a vector that points to the left, The direction is relative to the Canvas Perspective
   */
  static readonly LEFT: Vector2 = (function(): Vector2 {return new Vector2(-1, 0)})()
  /**
   * Returns a vector that points to the right, The direction is relative to the Canvas Perspective
   */
  static readonly RIGHT: Vector2 = (function(): Vector2 {return new Vector2(1, 0)})()
  /**
   * Creates a Vector2 that represents a square
   * @param size The size of the square
   * @returns Vector2(size, size)
   */
  static square(size: number): Vector2 {return new Vector2(size, size)}
  /**
   * Converts JSON string to Vector2. It should have x and y format property inside.
   * @param json the JSON input in string
   * @returns the Vector2 of the input JSON
   */
  static fromJSON(json: string): Vector2 {const data = JSON.parse(json);return new Vector2(data.x, data.y);}
}