import { useReducer, useCallback } from 'react';
import type { CalcState, CalcAction, HistoryItem } from '../types';
import { evaluate } from '../utils/calcEngine';

const initialState: CalcState = {
  display: '0',
  currentInput: '',
  previousInput: '',
  operator: null,
  waitingForOperand: false,
  history: [],
  fullExpression: ''
};

function calcReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case 'INPUT_DIGIT': {
      const { digit } = action;
      
      if (state.waitingForOperand) {
        return {
          ...state,
          display: digit,
          currentInput: digit,
          waitingForOperand: false,
          fullExpression: state.fullExpression + digit
        };
      }
      
      const newInput = state.currentInput === '0' ? digit : state.currentInput + digit;
      const newFullExpression = state.fullExpression === '' ? digit : 
        (state.fullExpression.endsWith('+') || state.fullExpression.endsWith('-') || 
         state.fullExpression.endsWith('×') || state.fullExpression.endsWith('÷')) ? 
        state.fullExpression + digit : 
        state.fullExpression.replace(/\d+\.?\d*$/, newInput);
      
      return {
        ...state,
        display: newInput,
        currentInput: newInput,
        fullExpression: newFullExpression
      };
    }
    
    case 'INPUT_DECIMAL': {
      if (state.waitingForOperand) {
        return {
          ...state,
          display: '0.',
          currentInput: '0.',
          waitingForOperand: false,
          fullExpression: state.fullExpression + '0.'
        };
      }
      
      if (state.currentInput.includes('.')) {
        return state;
      }
      
      const newInput = state.currentInput + '.';
      const newFullExpression = state.fullExpression === '' ? '0.' : 
        state.fullExpression.replace(/\d+\.?\d*$/, newInput);
      
      return {
        ...state,
        display: newInput,
        currentInput: newInput,
        fullExpression: newFullExpression
      };
    }
    
    case 'INPUT_OPERATOR': {
      const { operator } = action;
      
      const displayOperator = operator === '*' ? '×' : operator === '/' ? '÷' : operator === '-' ? '−' : operator;
      
      if (state.previousInput && state.operator && !state.waitingForOperand) {
        const expression = `${state.previousInput}${state.operator}${state.currentInput}`;
        const result = evaluate(expression);
        
        if (result === 'Error') {
          return {
            ...state,
            display: 'Error',
            currentInput: '',
            previousInput: '',
            operator: null,
            waitingForOperand: true,
            fullExpression: ''
          };
        }
        
        return {
          ...state,
          display: result,
          currentInput: result,
          previousInput: result,
          operator,
          waitingForOperand: true,
          fullExpression: state.fullExpression + displayOperator
        };
      }
      
      const newFullExpression = state.fullExpression === '' ? 
        (state.currentInput || state.display) + displayOperator : 
        state.fullExpression + displayOperator;
      
      return {
        ...state,
        previousInput: state.currentInput || state.display,
        operator,
        waitingForOperand: true,
        fullExpression: newFullExpression
      };
    }
    
    case 'CALCULATE': {
      if (!state.operator || !state.previousInput) {
        return state;
      }
      
      const expression = `${state.previousInput}${state.operator}${state.currentInput}`;
      const result = evaluate(expression);
      
      if (result === 'Error') {
        return {
          ...state,
          display: 'Error',
          currentInput: '',
          previousInput: '',
          operator: null,
          waitingForOperand: true,
          fullExpression: ''
        };
      }
      
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        expression: state.fullExpression,
        result,
        timestamp: Date.now()
      };
      
      const newHistory = [historyItem, ...state.history].slice(0, 100);
      
      return {
        ...state,
        display: result,
        currentInput: result,
        previousInput: '',
        operator: null,
        waitingForOperand: true,
        history: newHistory,
        fullExpression: ''
      };
    }
    
    case 'CLEAR_ENTRY': {
      return {
        ...state,
        display: '0',
        currentInput: '0'
      };
    }
    
    case 'CLEAR_ALL': {
      return {
        ...initialState,
        history: []
      };
    }
    
    case 'BACKSPACE': {
      if (state.waitingForOperand || state.display === 'Error') {
        return state;
      }
      
      const newInput = state.currentInput.slice(0, -1) || '0';
      const newFullExpression = state.fullExpression.slice(0, -1);
      
      return {
        ...state,
        display: newInput,
        currentInput: newInput,
        fullExpression: newFullExpression
      };
    }
    
    case 'SET_ERROR': {
      return {
        ...state,
        display: action.error,
        currentInput: '',
        previousInput: '',
        operator: null,
        waitingForOperand: true,
        fullExpression: ''
      };
    }
    
    default:
      return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(calcReducer, initialState);
  
  const inputDigit = useCallback((digit: string) => {
    dispatch({ type: 'INPUT_DIGIT', digit });
  }, []);
  
  const inputDecimal = useCallback(() => {
    dispatch({ type: 'INPUT_DECIMAL' });
  }, []);
  
  const inputOperator = useCallback((operator: string) => {
    dispatch({ type: 'INPUT_OPERATOR', operator });
  }, []);
  
  const calculate = useCallback(() => {
    dispatch({ type: 'CALCULATE' });
  }, []);
  
  const clearEntry = useCallback(() => {
    dispatch({ type: 'CLEAR_ENTRY' });
  }, []);
  
  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);
  
  const backspace = useCallback(() => {
    dispatch({ type: 'BACKSPACE' });
  }, []);
  
  return {
    state,
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clearEntry,
    clearAll,
    backspace
  };
}