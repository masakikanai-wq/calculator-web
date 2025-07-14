import React from 'react';
import type { HistoryItem as HistoryItemType } from '../types';

interface HistoryItemProps {
  item: HistoryItemType;
  onCopy: (text: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item, onCopy }) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${item.expression} = ${item.result}`;
    onCopy(textToCopy);
  };

  return (
    <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
      <span className="font-mono text-sm sm:text-base text-gray-800 select-text flex-1">
        {item.expression} = {item.result}
      </span>
      <button
        onClick={handleCopy}
        className="ml-3 p-1 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
        title="コピー"
        aria-label="計算結果をコピー"
      >
        📋
      </button>
    </div>
  );
};