import CardInformation from "@/components/atoms/dashboardAtoms/CardInformation";
import BackgroundDispoCard from "@/components/molecules/BackgroundDispoCard";
import CarouselItem from "@/components/molecules/CarouselItem";
import Contract from "@/services/Contrats/ContratModel";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import getMycontract from "@/services/Contrats/getByuser";
import useContract from "@/contexts/auth/useContract";

export default function Cartes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => {
      return getMycontract();
    },
    refetchOnWindowFocus: false,
  });
  const [activeCard, setActiveCard] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { contractId, setContractId } = useContract();
  const { gutters, borders, layout } = useTheme();
  useEffect(() => {
    if (data) {
      console.log("contract ID FROM DATA", data[currentIndex]?.contratId);
      console.log("currentIndex", currentIndex);
      setContractId(data[Math.abs(currentIndex)]?.contratId);
    }
  }, [currentIndex, data]);
  if (error) {
    console.log(error);
    return <View>{error.message}</View>;
  }
  if (isLoading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  if (!data) return <View />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackgroundDispoCard
          text1={"Disponible 1"}
          text2={"Disponible 2"}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />

        <CarouselItem
          data={data}
          currentIndex={currentIndex}
          onIndexChanged={setCurrentIndex}
        />

        <CardInformation activeCard={activeCard} />
      </View>
    </SafeAreaView>
  );
}
