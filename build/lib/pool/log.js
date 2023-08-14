export class LoggingPool {
    static get instance() {
        if (this._instance == null)
            this._instance = new LoggingPool();
        return this._instance;
    }
    static report() {
        const messages = this.instance.messages;
        if (messages.length == 0) {
            console.log("There are no Logs");
            return;
        }
        console.log("Beginning of Log Report");
        for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            switch (msg.type) {
                case "error":
                    console.error(msg);
                case "debug":
                    console.log(msg);
                case "warning":
                    console.warn(msg);
                case "dev":
                    console.debug(msg);
            }
        }
        console.log("End of Log Report");
    }
    constructor() {
        this._messages = [];
    }
    addLog(log) { this._messages.push(log); }
    add(id, message, type) { this._messages.push(new Log(id, message, type)); }
    clear() { this._messages = []; }
    get messages() { return this._messages; }
}
export class Log {
    get message() { return this._message; }
    get type() { return this._type; }
    get id() { return this._id; }
    constructor(id, message, type) {
        this._id = id;
        this._message = message;
        this._type = type;
    }
}
