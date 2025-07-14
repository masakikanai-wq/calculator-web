import React, { useEffect, useCallback, useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { History } from './History';
import { Toast } from './Toast';
import { copyToClipboard } from '../utils/clipboard';
import { isDigit, isOperator } from '../utils/calcEngine';

export const Calculator: React.FC = () => {
  const {
    state,
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clearEntry,
    clearAll,
    backspace
  } = useCalculator();

  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await copyToClipboard(text);
      setShowToast(true);
    } catch (error) {
      alert('コピーに失敗しました');
    }
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    
    if (isDigit(key) || isOperator(key) || key === '.' || key === 'Enter' || key === 'Backspace' || key === 'Escape' || key === 'Delete') {
      event.preventDefault();
    }
    
    if (isDigit(key)) {
      inputDigit(key);
    } else if (key === '.') {
      inputDecimal();
    } else if (key === '+') {
      inputOperator('+');
    } else if (key === '-') {
      inputOperator('-');
    } else if (key === '*') {
      inputOperator('*');
    } else if (key === '/') {
      inputOperator('/');
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === 'Escape') {
      clearAll();
    } else if (key === 'Delete') {
      clearEntry();
    }
  }, [inputDigit, inputDecimal, inputOperator, calculate, backspace, clearAll, clearEntry]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <>
      <div className="w-full max-w-md mx-auto px-4 md:px-0 md:w-2/5 md:min-w-96">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-200">
          <h1 className="text-lg sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">計算過程もコピペできる計算機</h1>
          <Display value={state.display} />
          <Keypad
            onDigit={inputDigit}
            onOperator={inputOperator}
            onDecimal={inputDecimal}
            onEquals={calculate}
            onClear={clearEntry}
            onClearAll={clearAll}
            onBackspace={backspace}
          />
        </div>
        <div className="mt-4 sm:mt-6">
          <History history={state.history} onCopy={handleCopy} />
          <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
            作成：
            <a 
              href="https://x.com/kanai_biz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors ml-1"
            >
              Masaki KANAI
            </a>
          </div>
        </div>
      </div>
      <Toast 
        message="コピーしました" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)}
      />
    </>
  );
};