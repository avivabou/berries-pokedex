import React, { useState, useEffect } from 'react';
import './VerticalScrollBar.css';
import { Option } from '../../Types'
import { calcGreenToRedFading } from '../../utils';

interface VerticalScrollBarProps {
  options: Option[]; 
  onSelected?: (option: Option) => void; 
}

const VerticalScrollBar: React.FC<VerticalScrollBarProps> = ({ options, onSelected }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbColor, setThumbColor] = useState('transparent');

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    onSelected?.(options[index]); 
  };

  useEffect(() => {
    const percentage = (activeIndex + 0.5) / options.length;
    const colorFading = calcGreenToRedFading(percentage)
    setThumbColor(`rgba(${colorFading.red}, ${colorFading.green}, 0, 0.8)`);
  }, [activeIndex, options.length]);

  return (
    <div className="scroll-wrapper">
      <div className="scroll-bar">
        <div
          className="scroll-thumb"
          style={{
            top: `calc(${(activeIndex + 0.5) / options.length * 100}%)`,
            boxShadow: `0 0 10px ${thumbColor}`,
            borderColor: thumbColor,
          }} 
        ></div>
      </div>
      <div className="option-list">
        {options.map((option, index) => ( 
          <div
            key={option.id} 
            className={`option-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
            style={{ color: index === activeIndex ? thumbColor : 'inherit' }}
          >
            <div className="option-title">{option.title}</div> 
            <div className="option-subtitle">{option.subtitle}</div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalScrollBar;
