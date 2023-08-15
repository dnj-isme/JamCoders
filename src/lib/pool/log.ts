import { LogType } from "../_general/types.js";

export class LoggingPool {
  private static _instance: LoggingPool;
  
  public static get instance() {
    if(this._instance == null) this._instance = new LoggingPool()
    return this._instance;
  }
  
  public static getUserLogs(): Log[] {
    return this.instance.messages.filter(data => data.type == "log")
  }
  
  static clear() {
    this.instance.clear()
  }
  
  public static report() {
    const messages: Log[] = this.instance.messages;

    if(messages.length == 0) {
      console.log("There are no Logs")
      return
    }

    console.log("Beginning of Log Report")
    for(let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      switch(msg.type) {
        case "error":
          console.error(msg)
          break
        case "debug":
          console.log(msg)
          break
        case "warning":
          console.warn(msg)
          break
        case "dev":
          console.debug(msg)
          break
        case "log":
          console.log(msg)
      }
    }
    console.log("End of Log Report")
  }

  private constructor(){
    this._messages = []
  }

  private _messages: Log[]

  public addLog(log: Log) {this._messages.push(log)}
  public add(id: string, message: string, type: LogType) {this._messages.push(new Log(id, message, type))}
  public clear(){this._messages = []}
  get messages() {return this._messages}
}

export class Log {
  private _message: string
  private _type: LogType
  private _id: string

  get message() {return this._message}
  get type() {return this._type}
  get id() {return this._id}

  constructor(id: string, message: string, type: LogType) {
    this._id = id
    this._message = message
    this._type = type
  }
}