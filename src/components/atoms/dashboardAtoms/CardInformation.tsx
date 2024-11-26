import { Dimensions, Modal, Text, View } from "react-native";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import useContract from "@/contexts/auth/useContract";
import getContractDisponibles from "@/services/Contrats/getContractDisponibles";
import React from "react";

type CardInformationProps = {
  activeCard: number;
};
function CardInformation({ activeCard }: CardInformationProps) {
  const { t } = useTranslation(["dashboard"]);
  const { borders, backgrounds, gutters, layout } = useTheme();
  const { height, width } = Dimensions.get("window");
  const [disponible, setDisponible] = useState();
  const { contractId } = useContract();
  const { data, isLoading, error } = useQuery({
    queryKey: [contractId],
    queryFn: () => {
      return getContractDisponibles(contractId);
    },
    enabled: !!contractId,
  });
  useEffect(() => {
    //console.log("contract id in card", contractId);
    if (data) {
      //  alert(JSON.stringify(data));
      const disponibleDtata = data.formule === activeCard;
      setDisponible(disponibleDtata);
    }
  }, [data, activeCard, contractId]);
  if (error)
    return (
      <Modal visible={true}>
        <View>
          <Text>{JSON.stringify(error)}</Text>
        </View>
      </Modal>
    );
  if (isLoading) return <View>{isLoading}</View>;
  return (
    <View
      style={[
        backgrounds.gray100,
        layout.itemsCenter,
        borders.rounded_16,
        layout.flex_1,
        gutters.marginBottom_32,
        layout.justifyAround,
        layout.col,
        gutters.marginHorizontal_12,
        // { width: width - 24, height: height - (315 + height / 6) },
      ]}
    >
      <ScrollView
        //style={[layout.flex_1]}
        contentContainerStyle={[
          layout.itemsCenter,
          layout.justifyBetween,
          layout.fullWidth,
          gutters.paddingBottom_16,
          gutters.paddingVertical_16,
        ]}
      >
        <ProgressBar
          title={t("dashboard:Factureencours")}
          progress={
            data?.fuctureApprouved > 0
              ? parseFloat(
                (data?.factureEnCours * 100) / data?.fuctureApprouved
              ).toFixed(2) * 1
              : 0
          }
          color={"purple100"}
          progressColor={"purple500"}
          part={data?.fuctureApprouved}
          accumulated={data?.factureEnCours}
        />
        <ProgressBar
          title={t("dashboard:FondGarentie")}
          progress={
            data?.contractFound > 0
              ? parseFloat(
                (data?.fondsDeGaranties * 100) / data?.contractFound
              ).toFixed(2) * 1
              : 0
          }
          color={"purple100"}
          progressColor={"red500"}
          part={data?.contractFound}
          accumulated={data?.fondsDeGaranties}
        />

        <ProgressBar
          title={t("dashboard:Depassement")}
          progress={
            data?.factureEnCours > 0
              ? parseFloat(
                (data?.limitSum * 100) / data?.factureEnCours
              ).toFixed(2) * 1
              : 0
          }
          color={"purple100"}
          progressColor={"red500"}
          part={`&#8734;`}
          center={data?.factureEnCours}
          accumulated={data?.depassementLimiteFinancementAcheteurs}
        />
      </ScrollView>
    </View>
  );
}

export default CardInformation;
