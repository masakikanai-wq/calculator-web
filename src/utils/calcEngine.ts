export function evaluate(expression: string): string {
  try {
    // Remove spaces and replace display operators with JavaScript operators
    const cleanExpression = expression
      .replace(/\s/g, '')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    // Basic validation
    if (!cleanExpression) return '0';
    
    // Check for division by zero
    if (/\/0(?!\d)/.test(cleanExpression)) {
      return 'Error';
    }

    // Evaluate the expression
    const result = Function(`"use strict"; return (${cleanExpression})`)();
    
    if (!isFinite(result)) {
      return 'Error';
    }

    // Format the result to 10 decimal places maximum
    const formattedResult = Number(result).toPrecision(10);
    return parseFloat(formattedResult).toString();
  } catch (error) {
    return 'Error';
  }
}

export function formatExpression(expression: string): string {
  return expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−');
}

export function isOperator(char: string): boolean {
  return ['+', '-', '*', '/', '×', '÷', '−'].includes(char);
}

export function isDigit(char: string): boolean {
  return /^\d$/.test(char);
}