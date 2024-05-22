import CardInformation from "@/components/atoms/dashboardAtoms/CardInformation";
import BackgroundDispoCard from "@/components/molecules/BackgroundDispoCard";
import CarouselItem from "@/components/molecules/CarouselItem";
import Contract from "@/services/Contrats/ContratModel";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "@/theme";

export default function Cartes() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { gutters, borders, layout } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackgroundDispoCard 
        text1={"Disponible 1"}
        text2={"Disponible 2"}
        />

        <CarouselItem
          data={contracts}
          currentIndex={currentIndex}
          onIndexChanged={setCurrentIndex}
        />

        <CardInformation />
      </View>
    </SafeAreaView>
  );
}
const contracts: Contract[] = [
  new Contract(1, 6553567876),
  new Contract(2, 1244576899),
  new Contract(3, 3000),
  new Contract(4, 4000),
  new Contract(5, 5000),
  new Contract(6, 6000),
];
