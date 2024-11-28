import CardInformation from "@/components/atoms/dashboardAtoms/CardInformation";
import BackgroundDispoCard from "@/components/molecules/BackgroundDispoCard";
import CarouselItem from "@/components/molecules/CarouselItem";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import getMycontract from "@/services/Contrats/getByuser";
import useContract from "@/contexts/auth/useContract";
import { useTranslation } from "react-i18next";
import useRefresh from "@/contexts/auth/useRefresh";
export default function Cartes() {
  const { t } = useTranslation(["bordereau"]);
  const { refresh } = useRefresh();
  const { data, isLoading, error } = useQuery({
    queryKey: ["contracts", refresh],
    queryFn: () => {
      return getMycontract();
    },
    refetchOnWindowFocus: false,
  });
  const [activeCard, setActiveCard] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {
    contractId,
    setContractId,
    contractMontant,
    setContractMontant,
    referenceContrat,
    setContractReference,
  } = useContract();

  const { gutters, borders, layout } = useTheme();
  useEffect(() => {
    if (data) {
      //console.log("contract ID FROM DATA", data[currentIndex]?.contratId);
      //console.log("currentIndex", currentIndex);
      setContractId(data[Math.abs(currentIndex)]?.contratId);
      setContractMontant(data[Math.abs(currentIndex)]?.montantContrat);
      setContractReference(data[Math.abs(currentIndex)]?.referenceContrat);
    }
  }, [currentIndex, data]);
  if (error) {
    //console.log(error);
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
        {/* <BackgroundDispoCard
          text1={t("dashboard:Available1")}
          text2={t("dashboard:Available2")}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        /> */}

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
