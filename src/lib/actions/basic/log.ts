import { Vector2 } from "../../_general/vector2.js";
import { OperatorNode } from "../../operators/_operatorNode.js";
import { Log, LoggingPool } from "../../pool/log.js";
import { VariableNode } from "../../variables/_variableNode.js";
import { ActionNode } from "../_action.js";

export class LogActionNode extends ActionNode {
  private _data: VariableNode | OperatorNode
  private _message: string | undefined;

  constructor(data: VariableNode | OperatorNode, position: Vector2 = Vector2.ZERO) {
    super("log", position)
    this._data = data
  }

  protected action(): void {
    if (this._data instanceof VariableNode) {
      this._message = this._data.value?.toString();
    } else if (this._data instanceof OperatorNode) {
      this._message = this._data.result?.toString();
    }

    if (this._message) {
      LoggingPool.instance.add(this.id, this._message, "log");
    } else {
      const errorType = this._data instanceof VariableNode ? "Variable value" : "Operator result";
      LoggingPool.instance.add(this.id, `${errorType} is undefined`, "error");
    }
  }


  get object(): object {
    return {
      _id: this.id,
      position: this.position.object,
      type: this.type,
      message: this._message,
    };
  }
}