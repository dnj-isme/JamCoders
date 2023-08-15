import { ActionNode } from "../actions/_action.js";
import { LoggingPool } from "../pool/log.js";
import { VariablePool } from "../pool/variable.js";

export class NodeExecution {
  private static readonly id = "node_execution"
  private static _instance: NodeExecution | undefined;
  private _first: ActionNode | undefined;

  public static get instance() {
    if (!this._instance) {
      this._instance = new NodeExecution();
    }
    return this._instance;
  }

  public static set first(node: ActionNode) {
    this.instance._first = node;
  }

  public static start() {
    this.instance.startExecution();
  }

  private constructor() {}

  private startExecution() {
    if (!this._first) {
      LoggingPool.instance.add(
        NodeExecution.id,
        "The first execution node is undefined",
        "error"
      );
    } else {
      LoggingPool.clear()
      VariablePool.refresh();
      this._first.execute();
    }
  }
}
