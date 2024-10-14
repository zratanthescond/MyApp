import React, { useState } from "react";
import { InputWithTag } from "../atoms";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import { Alert, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import Dropdown from "../atoms/Dropdown";
import Button from "../atoms/form/Button";
import WhiteCard from "../atoms/form/WhiteCard";
import DatePicker from "react-native-date-picker";
import InputDate from "./InputDate";

export default function LitigeForm({ formData, setFormData }) {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();

  const WhiteCardStyle = [
    layout.col,
    layout.flex_1,
    layout.itemsStart,
    layout.justifyStart,
    gutters.padding_12,
    layout.fullWidth,
    { gap: 20 },
  ];
  const options = [
    { key: "achat", value: "achat", label: "Achat" },
    { key: "sond", value: "sond", label: "Sond" },
    { key: "p-dir", value: "P Dir", label: "P Dir" },
    { key: "autre", value: "autre", label: "Autre" },
  ];

  const TextStyle = [fonts.bold, fonts.size_16, fonts.gray400];
  return (
    <ScrollView
      style={[layout.fullWidth]}
      contentContainerStyle={[layout.fullWidth, gutters.paddingBottom_80]}
    >
      <View
        style={[
          layout.col,
          layout.justifyBetween,
          gutters.padding_12,

          // backgrounds.white,
          backgrounds.gray100,
        ]}
      >
        <WhiteCard style={WhiteCardStyle}>
          <Text style={TextStyle}>Date litige</Text>
          <InputDate
            onchange={(value) =>
              setFormData({ ...formData, DateLitige: value })
            }
          />
        </WhiteCard>
        <WhiteCard style={WhiteCardStyle}>
          <Text style={TextStyle}> Date Echeance Litige</Text>
          <InputDate
            onchange={(value) => {
              setFormData({ ...formData, DateEcheanceLitige: value });
            }}
          />
        </WhiteCard>
        <WhiteCard style={[...WhiteCardStyle, layout.z10]}>
          <Text style={TextStyle}> Type Litige</Text>
          <Dropdown
            data={options}
            setSelected={(val) => setFormData({ ...formData, TypeLitige: val })}
          />
        </WhiteCard>

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
