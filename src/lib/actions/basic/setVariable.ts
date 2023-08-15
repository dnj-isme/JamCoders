import { VariableType } from "../../_general/types.js";
import { Vector2 } from "../../_general/vector2.js";
import { OperatorNode } from "../../operators/_operatorNode.js";
import { LoggingPool } from "../../pool/log.js";
import { VariableNode, getType } from "../../variables/_variableNode.js";
import { CollectionSelectorNode } from "../../variables/collection/collectionSelector.js";
import { ActionNode } from "../_action.js"

declare type ValueParameter = VariableType | VariableNode | OperatorNode | CollectionSelectorNode

export class SetVariableActionNode extends ActionNode {
  
  public variable: VariableNode | undefined = undefined
  public value: ValueParameter

  constructor(variable: VariableNode | CollectionSelectorNode, value: ValueParameter, position: Vector2 = Vector2.ZERO ) {
    super("set variable", position)
    if(variable instanceof CollectionSelectorNode && variable.result != undefined) {
      this.variable = variable.result
    }
    else if (variable instanceof VariableNode) {
      this.variable = variable
    }
    this.value = value
  }

  protected action(): void {
    if(!this.variable) {
      LoggingPool.instance.add(this.id, "Variable is undefined (doesn't exists)", "error")
      return
    }

    let data: VariableType = undefined
    if(getType(this.value as VariableType) !== "undefined") {
      data = this.value as VariableType
    }
    else if (this.value instanceof VariableNode) {
      data = this.value.value
    }
    else if (this.value instanceof OperatorNode) {
      data = this.value.result
    }
    else if (this.value instanceof CollectionSelectorNode) {
      data = this.value.result?.value
    }

    if(!data) {
      LoggingPool.instance.add(this.id, "Undefined value parameter", "error")
      return
    }

    if(getType(this.variable.value) === getType(data)) {
      this.variable.value = data
    }
    else if(getType(this.variable.value) == "text") {
      LoggingPool.instance.add(this.id, "The data will be automatically converted to string", "warning")
      this.variable.value = data.toString()
    }
    else {
      LoggingPool.instance.add(this.id, "The variable type and the value doesn't match", "error")
    }
  }
  
  get object(): object {
    return {
      _id: this.id,
      position: this.position.object,
      type: this.type,
      variable: this.variable,
      value: this.value
    };
  }
}