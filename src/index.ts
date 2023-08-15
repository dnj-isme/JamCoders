import { Vector2 } from "./lib/_general/vector2.js";
import { LogActionNode } from "./lib/actions/basic/log.js";
import { SetVariableActionNode } from "./lib/actions/basic/setVariable.js";
import { ComparatorOperatorNode } from "./lib/operators/comparator.js";
import { NumberOperatorNode } from "./lib/operators/number.js";
import { TextOperatorNode } from "./lib/operators/text.js";
import { Vector2OperatorNode } from "./lib/operators/vector2.js";
import { NodeExecution } from "./lib/_general/nodeExecution.js";
import { Log, LoggingPool } from "./lib/pool/log.js";
import { NodePool } from "./lib/pool/node.js";
import { VariablePool } from "./lib/pool/variable.js";
import { BooleanNode } from "./lib/variables/booleanNode.js";
import { CollectionNode } from "./lib/variables/collection/collectionNode.js";
import { NumberNode } from "./lib/variables/numberNode.js";
import { TextNode } from "./lib/variables/stringNode.js";
import { Vector2Node } from "./lib/variables/vector2Node.js";

// Phase 1: Declare Variable
let playerPos = new Vector2Node("player pos", new Vector2(2, 3))
let enemyPos = new Vector2Node("enemy pos", new Vector2(12, 12))
let report = new NumberNode("report", 0)
let reportText = new TextNode("report text", "")

// Phase 2: Declare Nodes
let setReport = new SetVariableActionNode(report, new Vector2OperatorNode(playerPos, enemyPos, "distance"))
let logging = new LogActionNode(report)
let setReportText = new SetVariableActionNode(reportText, 
  new TextOperatorNode(
    new TextNode("", "Distance : "), 
    new NumberOperatorNode(report, 
      new NumberNode("", 2), 
      "round"), 
    "concat")
  )
let logging2 = new LogActionNode(reportText)


// Phase 2a: Set execution order
NodeExecution.first = setReport
setReport.next = logging
logging.next = setReportText
setReportText.next = logging2

// Phase 3: Execution
NodeExecution.start()

// Showing Results
let result = LoggingPool.getUserLogs()
console.log(result)

// Testing Purpose
console.log("Testing Purpose")

// Phase 3: Execution
NodeExecution.start()

// Showing Results
result = LoggingPool.getUserLogs()
console.log(result)