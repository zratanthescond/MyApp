import React from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import Form from "../Bordureau/form";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import Button from "@/components/atoms/form/Button";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";

import Dropdown from "@/components/atoms/Dropdown";
import { InputWithTag } from "@/components/atoms";
export default function BordureauDetails() {
  const { height, width } = Dimensions.get("window");
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const dataReglement = [
    { key: "1", value: "Traite" },
    { key: "2", value: "Chèque" },
    { key: "3", value: "Virement" },
  ];

  const dataDocument = [
    { key: "1", value: "Facture" },
    { key: "2", value: "B.Commande" },
    { key: "3", value: "Marche" },
  ];
  const textStyle = [
    colors.gray800,
    fonts.bold,
    { paddingVertical: 10 },
    { paddingHorizontal: 5 },
  ];
  return (
    <SafeAreaView style={{ flex: 1, marginVertical: 2 }}>
      <View
        style={{ justifyContent: "center", marginLeft: 20, marginRight: 20 }}
      >
        <ProgressBar
          title={"Simulation Pour Compléter"}
          progress={50}
          color={"purple100"}
          progressColor={"purple500"}
        />
      </View>
      <View style={{ justifyContent: "center", marginVertical: 2 }}>
        <GrayCard height={height / 2}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                zIndex: 100,
                padding: 10,
              }}
            >
              <View style={{ width: "40%" }}>
                <Text style={textStyle}>Type De reglement</Text>
                <Dropdown data={dataReglement} />
              </View>
              <View style={{ width: "40%" }}>
                <Text style={textStyle}>Type De document</Text>
                <Dropdown data={dataDocument} />
              </View>
            </View>
            <View
              style={[
                backgrounds.white,
                layout.row,
                { marginHorizontal: 7.5, padding: 7.5, borderRadius: 10 },
              ]}
            >
              <InputWithTag
                title={"Montant Doc"}
                inputDisabled={true}
                tag={{ type: "text", text: "TND" }}
                value={"20,263.063"}
                textInputPlaceholder={"20,263.063"}
              />
            </View>

            <View style={[layout.row, { padding: 7.5, borderRadius: 10 }]}>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder={"Ref Document"}
                onChange={() => {}}
              />
            </View>
            <View style={[layout.row, { padding: 7.5, borderRadius: 10 }]}>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder={"Echeance"}
                onChange={() => {}}
              />
            </View>
            <View style={[layout.row, { padding: 7.5, borderRadius: 10 }]}>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder={"date"}
                onChange={() => {}}
                tag={{
                  type: "icon",
                  name: "calendar-month",
                  iconType: "MaterialIcons",
                }}
                onIconPress={() => {}}
              />
            </View>
          </ScrollView>
        </GrayCard>
      </View>
      <View style={{ alignSelf: "center", height: height / 10 }}>
        <Button />
      </View>
    </SafeAreaView>
  );
}
