import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { useTheme } from "@/theme";
import Card from "@/components/atoms/dashboardAtoms/DisponibleCard";

const { height, width } = Dimensions.get("window");

interface CardProps {
  isActive: boolean;
  onPress: () => void;
  text: string;
}

interface BackgroundDispoCardProps {
  text1: string;
  text2: string;
  setActiveCard: React.Dispatch<React.SetStateAction<number>>;
  activeCard: number;
}

function BackgroundDispoCard({
  text1,
  text2,
  setActiveCard,
  activeCard,
}: BackgroundDispoCardProps): JSX.Element {
  // Type number pour activeCard

  const handleCardPress = (card: number) => {
    setActiveCard(card);
  };

  const { layout, backgrounds, gutters, colors } = useTheme();

  return (
    <View
      style={[
        layout.row,
        {
          width: "90%",
          alignSelf: "center",
          backgroundColor: "#E4EAF0",
          padding: 10,
          borderTopLeftRadius: 100,
          borderBottomRightRadius: 100,
        },
      ]}
    >
      <Card
        isActive={activeCard === 1}
        onPress={() => handleCardPress(1)}
        text={text1}
      />
      <Card
        isActive={activeCard === 2}
        onPress={() => handleCardPress(2)}
        text={text2}
      />
    </View>
  );
}

export default BackgroundDispoCard;
