import React from "react";
import { InputWithTag } from "../atoms";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import Dropdown from "../atoms/Dropdown";
import Button from "../atoms/form/Button";

export default function ProrogationForm() {
  const { fonts, colors, layout, backgrounds, gutters, borders, variant } =
    useTheme();
  return (
    <ScrollView
      style={[layout.fullWidth]}
      contentContainerStyle={[layout.fullWidth, gutters.paddingBottom_80]}
    >
      <View
        style={[
          layout.col,
          layout.justifyAround,
          gutters.padding_12,
          { height: 400 },
          // backgrounds.white,
          backgrounds.gray100,
        ]}
      >
        <Text> Type de prorogation</Text>
        <Dropdown
          data={["achat", "sond", "P Dir", "autre"]}
          setSelected={() => {}}
        />
        <Text>Date Echeance prorogation</Text>
        <InputWithTag
          titleWidth={0}
          tag={{
            type: "icon",
            name: "calendar",
            iconType: "AntDesign",
          }}
        />
        <Text>Motif prorogation</Text>
        <InputWithTag titleWidth={0} />
        <Text> Date Echeance Apres prorogation</Text>
        <InputWithTag
          titleWidth={0}
          tag={{ type: "icon", name: "calendar", iconType: "AntDesign" }}
        />
        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.fullWidth,
            // backgrounds.white,
            gutters.padding_12,
            borders.rounded_16,
            gutters.marginVertical_12,
          ]}
        >
          <Button outlined={true} label={"Annuler"} onPress={() => {}} />

          <Button label={"Enregistrer"} onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}
