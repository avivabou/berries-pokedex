import React from 'react';
import './LineCard.css';

interface LineCardProps {
  berryName: string;
  berryIconSrc: string;
  flavors: string[];
}

const LineCard: React.FC<LineCardProps> = ({ berryName, berryIconSrc, flavors }) => {
  return (
    <div className="line-card">
      <div className="berry-info">
        <img src={berryIconSrc} alt={`${berryName} icon`} className="berry-icon" />
        <span className="berry-name">{berryName}</span>
      </div>
      <div className="flavors">
        {flavors.map((flavor, index) => (
          <div key={index} className="flavor">{flavor}</div>
        ))}
      </div>
    </div>
  );
};

export default LineCard;
