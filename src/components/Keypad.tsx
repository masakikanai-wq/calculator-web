import React from 'react';
import { Button } from './Button';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onOperator: (operator: string) => void;
  onDecimal: () => void;
  onEquals: () => void;
  onClear: () => void;
  onClearAll: () => void;
  onBackspace: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onOperator,
  onDecimal,
  onEquals,
  onClear,
  onClearAll,
  onBackspace
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
      {/* Row 1 */}
      <Button onClick={onClearAll} type="action">AC</Button>
      <Button onClick={onClear} type="action">C</Button>
      <Button onClick={onBackspace} type="action">⌫</Button>
      <Button onClick={() => onOperator('/')} type="operator">÷</Button>
      
      {/* Row 2 */}
      <Button onClick={() => onDigit('7')} type="number">7</Button>
      <Button onClick={() => onDigit('8')} type="number">8</Button>
      <Button onClick={() => onDigit('9')} type="number">9</Button>
      <Button onClick={() => onOperator('*')} type="operator">×</Button>
      
      {/* Row 3 */}
      <Button onClick={() => onDigit('4')} type="number">4</Button>
      <Button onClick={() => onDigit('5')} type="number">5</Button>
      <Button onClick={() => onDigit('6')} type="number">6</Button>
      <Button onClick={() => onOperator('-')} type="operator">−</Button>
      
      {/* Row 4 */}
      <Button onClick={() => onDigit('1')} type="number">1</Button>
      <Button onClick={() => onDigit('2')} type="number">2</Button>
      <Button onClick={() => onDigit('3')} type="number">3</Button>
      <Button onClick={() => onOperator('+')} type="operator">+</Button>
      
      {/* Row 5 */}
      <Button onClick={() => onDigit('0')} type="number" className="col-span-2">0</Button>
      <Button onClick={onDecimal} type="number">.</Button>
      <Button onClick={onEquals} type="equals">=</Button>
    </div>
  );
};