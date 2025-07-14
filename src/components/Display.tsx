import React from 'react';

interface DisplayProps {
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg border border-gray-200">
      <div className="text-right">
        <input
          type="text"
          value={value}
          readOnly
          className="w-full text-right font-light bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
          style={{ 
            fontSize: 'clamp(2rem, 8vw, 5rem)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: '300',
            letterSpacing: '-0.02em'
          }}
          aria-label="Calculator display"
          placeholder="0"
        />
      </div>
    </div>
  );
};