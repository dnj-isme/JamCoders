import { VariableNode } from "../variables/_variableNode.js";
import { Log, LoggingPool } from "./log.js";

export class VariablePool {
  public static readonly id = "variable_pool"
  
  private static _instance: VariablePool;

  public static get instance() {
    if(this._instance == null) this._instance = new VariablePool()
    return this._instance;
  }

  public static report() {
    const variables = VariablePool.instance.collection

    for(let i = 0; i < variables.length; i++) {
      console.log(variables[i])
    }
  }

  private constructor() {
    this.variableList = new Map()
  }

  private variableList: Map<string, VariableNode>

  public add(label: string, value: VariableNode) {
    if(this.variableList.has(label)) {
      LoggingPool.instance.add(VariablePool.id, `Duplicate label "${label}"`, "error")
      return
    }
    this.variableList.set(label, value)
  }

  public clear() {
    this.variableList.clear()
  }

  public find(label: string) {
    const res = this.variableList.get(label)
    if(!res) {
      LoggingPool.instance.add(VariablePool.id, `Variable node with label ${label} is not exists!`, "error")
    }
    return res
  }

  get labels() {
    return Array.from(this.variableList, ([key, value], idx) => {
      return key
    })
  }

  get variables() {
    return Array.from(this.variableList, ([key, value], idx) => {
      return value
    })
  }

  get collection() {
    return Array.from(this.variableList, ([label, variable], _) => {
      return {label, variable}
    })
  }
}