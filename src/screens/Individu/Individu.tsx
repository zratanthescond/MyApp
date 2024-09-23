import React from "react";
import { SafeScreen } from "@/components/template";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme";

import AppIcon from "@/components/icons/AppIcons";
import { ScrollView } from "react-native-gesture-handler";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import IndividuComponent from "@/components/molecules/Individu";
import BottomModal from "@/components/molecules/BottomModal";
import Button from "@/components/atoms/form/Button";
import { useQuery } from "@tanstack/react-query";
import { getAcheteur, getIndividu } from "@/services/Individu/individu";
import useContract from "@/contexts/auth/useContract";

export default function Individu(): React.ReactElement {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { contractId } = useContract();
  console.log(contractId);
  const individuData = useQuery({
    queryKey: ["contractId"],
    queryFn: () => {
      return getIndividu(contractId);
    },
  });
  const acheteurs = useQuery({
    queryKey: ["acheteurs"],
    queryFn: () => {
      return getAcheteur(contractId);
    },
  });
  return (
    <SafeScreen>
      <View style={[backgrounds.white, layout.flex_1]}>
        <Text
          style={[
            fonts.blue100,
            fonts.bold,
            fonts.size_16,
            { textAlign: "center" },
          ]}
        >
          Liste des acheteurs
        </Text>
        <View
          style={[
            layout.row,
            layout.justifyEnd,
            gutters.marginHorizontal_12,
            {
              gap: 10,
            },
          ]}
        >
          <TouchableOpacity
            style={[backgrounds.purple500, borders.rounded_4, { padding: 5 }]}
            onPress={() => setModalVisible(true)}
          >
            <AppIcon
              name="adduser"
              type="AntDesign"
              color={colors.white}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[backgrounds.blue50, borders.rounded_4, { padding: 5 }]}
          >
            <AppIcon
              name="filter"
              type="AntDesign"
              color={colors.white}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {acheteurs.data?.$values.map((acheteur) => {
            console.log(acheteur);
            return <IndividuComponent key={acheteur.id} individu={acheteur} />;
          })}
          {/* <IndividuComponent />
          <IndividuComponent />
          <IndividuComponent />
          <IndividuComponent /> */}
        </ScrollView>
        <BottomModal
          title="Liste des individus"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <ScrollView>
            {individuData.data?.$values.map((individu) => {
              console.log(individu);
              return (
                <IndividuComponent key={individu.id} individu={individu} />
              );
            })}
          </ScrollView>
          <View>
            <Button label="annule" />
            <Button label="confirmer" />
          </View>
        </BottomModal>
      </View>
    </SafeScreen>
  );
}
