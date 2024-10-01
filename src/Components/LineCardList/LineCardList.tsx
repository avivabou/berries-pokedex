import React from 'react';
import LineCard from '../LineCard/LineCard';
import { Berry } from '../../Types';

interface LineCardListProps {
  berries: Berry[];
}

const LineCardList: React.FC<LineCardListProps> = ({ berries }) => {
  return (
    <div className="line-card-list">
      {berries.map((berry, index) => (
        <LineCard
          key={index}
          berryName={berry.name}
          berryIconSrc={berry.iconSrc}
          flavors={berry.flavors}
        />
      ))}
    </div>
  );
};

export default LineCardList;
