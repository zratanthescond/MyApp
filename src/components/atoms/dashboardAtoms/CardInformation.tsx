import { Dimensions, Modal, Text, View } from "react-native";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import useContract from "@/contexts/auth/useContract";
import getContractDisponibles from "@/services/Contrats/getContractDisponibles";

type CardInformationProps = {
  activeCard: number;
};
function CardInformation({ activeCard }: CardInformationProps) {
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
    console.log("contract id in card", contractId);
    if (data) {
      console.log(data);
      const disponibleDtata = data.find((d) => d.formule === activeCard);
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
        gutters.padding_12,
        backgrounds.gray100,
        layout.itemsCenter,
        borders.rounded_16,
        gutters.margin_12,
        gutters.marginBottom_32,
        layout.justifyAround,
        layout.col,
        { width: width - 24, height: height - (315 + height / 6) },
      ]}
    >
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={[
          layout.itemsCenter,
          layout.justifyBetween,
          gutters.margin_12,
          gutters.paddingBottom_16,
        ]}
      >
        <ProgressBar
          title={"Facture en cours"}
          progress={parseInt(Math.random() * 100)}
          color={"purple100"}
          progressColor={"purple500"}
          part={parseInt(Math.random() * 100)}
          accumulated={disponible?.factureEnCours}
        />
        <ProgressBar
          title={"Fonds de garantie"}
          progress={parseInt(Math.random() * 100)}
          color={"purple100"}
          progressColor={"red500"}
          part={parseInt(Math.random() * 100)}
          accumulated={disponible?.fondsDeGaranties}
        />
        <ProgressBar
          title={"Fonds de reserve"}
          progress={parseInt(Math.random() * 100)}
          color={"purple100"}
          progressColor={"red500"}
          part={parseInt(Math.random() * 100)}
          accumulated={disponible?.fondsDeReserve}
        />
        <ProgressBar
          title={"depassement Limite Financement Acheteurs"}
          progress={parseInt(Math.random() * 100)}
          color={"purple100"}
          progressColor={"red500"}
          part={parseInt(Math.random() * 100)}
          accumulated={disponible?.depassementLimiteFinancementAcheteurs}
        />
      </ScrollView>
    </View>
  );
}

export default CardInformation;
