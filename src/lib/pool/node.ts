import { BaseNode } from "../_general/baseNode.js";
import { LoggingPool } from "./log.js";

export class NodePool {
  public static readonly id = "node_pool"
  
  private static _instance: NodePool;

  public static get instance() {
    if(this._instance == null) this._instance = new NodePool()
    return this._instance;
  }

  public static report() {
    const variables = NodePool.instance.collection

    for(let i = 0; i < variables.length; i++) {
      console.log(variables[i])
    }
  }

  private constructor() {
    this.variableList = new Map()
  }

  private variableList: Map<string, BaseNode>

  public add(id: string, value: BaseNode) {
    if(this.variableList.has(id)) {
      LoggingPool.instance.add(value.id, `Duplicate id "${id}"`, "error")
      return
    }
    this.variableList.set(id, value)
  }

  public clear() {
    this.variableList.clear()
  }

  public find(id: string) {
    const res = this.variableList.get(id)
    if(!res) {
      LoggingPool.instance.add(NodePool.id, `Variable node with id ${id} is not exists!`, "error")
    }
    return res
  }

  get nodes() {
    return Array.from(this.variableList, ([_, value], __) => {
      return value
    })
  }

  get collection() {
    return Array.from(this.variableList, ([id, variable], _) => {
      return {id, variable}
    })
  }
}