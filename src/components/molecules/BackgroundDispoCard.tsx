import Card from '@/components/atoms/dashboardAtoms/DisponibleCard';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useTheme } from "@/theme";
const { height, width } = Dimensions.get('window');


const BackgroundDispoCard = () => {
  const [activeCard, setActiveCard] = useState(1); // Initialiser activeCard à 1

  const handleCardPress = (card: number) => {
    setActiveCard(card);
  };
  const { layout, backgrounds, gutters, colors } = useTheme();

  return (
    <View
      style={[
      layout.row,
      
       {width: '90%',
       alignSelf:'center',
    
        backgroundColor: '#E4EAF0',
       padding: 10,
       borderTopLeftRadius: 100,
       borderBottomRightRadius: 100} 
      ]}
    >
      <Card
        isActive={activeCard === 1}
        onPress={() => handleCardPress(1)}
        text="disponible 1"
      />
      <Card
        isActive={activeCard === 2}
        onPress={() => handleCardPress(2)}
        text="disponible 2"
      />
    </View>
  );
};

export default BackgroundDispoCard;
