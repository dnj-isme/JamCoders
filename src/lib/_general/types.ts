import { Vector2 } from "./vector2.js"

export declare type LogType = "error" | "debug" | "warning" | "dev" | "log"

export declare type VariableType = string | number | boolean | Vector2 | undefined
export declare type VariableTypeString = "text" | "number" | "boolean" | "vector2" | "undefined"

export declare type NumberOperatorType = "add" | "substract" | "multiply" | "divide" | "max" | "min" | "power" | "root" | "round"
export declare type BooleanOperatorType = "and" | "or" | "xor" | "not"
export declare type TextOperatorType = "concat" | "left" | "right" | "length"
export declare type Vector2OperatorType = "add" | "substract" | "multiply" | "divide" | "magnitude" | "normalize" | "dot" | "reverse" | "distance"
export declare type ComparatorOperatorType = "equal" | "not equal" | ">" | "<" | "<=" | ">="

export declare type ActionType = BasicActionType
export declare type BasicActionType = "set variable" | "if" | "loop" | "break loop" | "log"