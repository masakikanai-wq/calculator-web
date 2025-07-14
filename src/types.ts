export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalcState {
  display: string;
  currentInput: string;
  previousInput: string;
  operator: string | null;
  waitingForOperand: boolean;
  history: HistoryItem[];
  fullExpression: string;
}

export type CalcAction =
  | { type: 'INPUT_DIGIT'; digit: string }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'INPUT_OPERATOR'; operator: string }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'CLEAR_ALL' }
  | { type: 'BACKSPACE' }
  | { type: 'SET_ERROR'; error: string };