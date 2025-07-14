import React from 'react';
import type { HistoryItem as HistoryItemType } from '../types';
import { HistoryItem } from './HistoryItem';

interface HistoryProps {
  history: HistoryItemType[];
  onCopy: (text: string) => void;
}

export const History: React.FC<HistoryProps> = ({ history, onCopy }) => {
  const handleCopyAll = () => {
    const allCalculations = history
      .slice()
      .reverse()
      .map(item => `${item.expression} = ${item.result}`)
      .join('\n');
    onCopy(allCalculations);
  };

  if (history.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 h-36 sm:h-48 overflow-y-auto shadow-lg">
        <div className="text-center text-gray-500 text-xs sm:text-sm">
          計算履歴がここに表示されます
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 h-36 sm:h-48 overflow-y-auto shadow-lg">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <div className="text-base sm:text-lg text-gray-800 font-semibold">計算履歴</div>
        <button
          onClick={handleCopyAll}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-lg transition-colors text-xs sm:text-sm font-medium"
          title="すべての履歴をコピー"
        >
          すべてコピー
        </button>
      </div>
      <div className="space-y-1 sm:space-y-2">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} onCopy={onCopy} />
        ))}
      </div>
    </div>
  );
};