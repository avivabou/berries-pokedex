import React, { useEffect, useState } from 'react';
import VerticalScrollBar from '../VerticalScrollBar/VerticalScrollBar';
import LineCardList from '../LineCardList/LineCardList';
import { Berry } from '../../Types';

const firmnessOrder = [
  "super-hard",
  "very-hard",
  "hard",
  "soft",
  "very-soft"
];

const BerriesViewer: React.FC = () => {
  const [berries, setBerries] = useState<Berry[]>([]);
  const [firmnessTypes, setFirmnessTypes] = useState<string[]>([]);
  const [selectedFirmness, setSelectedFirmness] = useState<string>('');

  useEffect(() => {
    const fetchBerries = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/berry');
      const data = await response.json();

      const berryDetailsPromises = data.results.map(async (result: any) => {
        const berryResponse = await fetch(result.url);
        const berryData = await berryResponse.json();
        const firmnessName = berryData.firmness.name;
        const flavors = berryData.flavors.reduce((acc: string[], flavor: any) => {
            if (flavor.potency > 0) {
                acc.push(flavor.flavor.name)
            }
            return acc;
        }, []);
        
        return {
          name: result.name,
          iconSrc: "https://logowik.com/content/uploads/images/346_raspberry_pi_logo.jpg", 
          firmness: firmnessName,
          flavors,
        };
      });

      const berryDetails = await Promise.all(berryDetailsPromises);
      setBerries(berryDetails);
      const firmnessSet = new Set(berryDetails.map(berry => berry.firmness));
      setFirmnessTypes(Array.from(firmnessSet));
    };

    fetchBerries();
  }, []);

  const handleFirmnessSelection = (firmness: string) => {
    setSelectedFirmness(firmness);
  };

  const firmnessOptions = firmnessTypes
    .map((type) => {
      const count = berries.filter(berry => berry.firmness === type).length;
      return {
        id: type,
        title: type,
        subtitle: `Berries: ${count}`, 
      };
    })
    .sort((a, b) => firmnessOrder.indexOf(a.title) - firmnessOrder.indexOf(b.title)); // Sort based on firmnessOrder

  const filteredBerries = selectedFirmness
    ? berries.filter(berry => berry.firmness === selectedFirmness)
    : berries;

  return (
    <div style={{ display: 'flex', height: '500px' }}> 
      <VerticalScrollBar 
        options={firmnessOptions} 
        onSelected={(option) => handleFirmnessSelection(option.title)} 
      />
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '100%' }}>
        <LineCardList berries={filteredBerries} />
      </div>
    </div>
  );
};

export default BerriesViewer;
