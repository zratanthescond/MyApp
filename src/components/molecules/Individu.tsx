import React from "react";
import { Text, View } from "react-native";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import WhiteCard from "../atoms/form/WhiteCard";
import { useTheme } from "@/theme";
export default function IndividuComponent({ individu }) {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  console.log(individu);
  return (
    <GrayCard>
      <WhiteCard
        style={[
          layout.col,
          layout.justifyBetween,
          gutters.marginHorizontal_16,

          layout.itemsCenter,
          gutters.padding_16,
        ]}
        height={80}
      >
        <View style={[layout.row, layout.justifyBetween, layout.fullWidth]}>
          <Text style={[fonts.blue100, fonts.bold, fonts.size_12]}>Nom</Text>
          <Text style={[fonts.blue100, fonts.bold, fonts.size_12]}>Prenom</Text>
        </View>
        <View style={[layout.row, layout.justifyBetween, layout.fullWidth]}>
          <Text style={[fonts.blue100, fonts.bold, fonts.size_12]}>
            {individu.nom}
          </Text>
          <Text style={[fonts.blue100, fonts.bold, fonts.size_12]}>
            {individu.prenom}
          </Text>
        </View>
      </WhiteCard>
    </GrayCard>
  );
}
