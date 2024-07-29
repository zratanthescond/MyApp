import React from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import Button from "@/components/atoms/form/Button";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";

import Dropdown from "@/components/atoms/Dropdown";
import { InputWithTag } from "@/components/atoms";
import DatePicker from "@/components/atoms/bordureauAtoms/DatePicker";
import Form from "../Bordureau/form";

export default function BordureauDetails() {
  const { height, width } = Dimensions.get("window");
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const dataReglement = [
    { key: "1", value: "Traite" },
    { key: "2", value: "Chèque" },
    { key: "3", value: "Financements" },
  ];

  const dataDocument = [
    { key: "1", value: "Facture" },
    { key: "2", value: "B.Commande" },
    { key: "3", value: "Marche" },
  ];
  const textStyle = [
    fonts.gray800,
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
          title="Simulation Pour Compléter"
          progress={50}
          color="purple100"
          progressColor="purple500"
        />
      </View>
      <View style={{ justifyContent: "center" }}>
        <GrayCard height={height / 2}>
          <ScrollView
            contentContainerStyle={{
              gap: 8,
              flexDirection: "column",
              backgroundColor: colors.white,
              marginVertical: 10,
              borderRadius: 20,
            }}
          >
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
                title="Montant Doc"
                inputDisabled
                tag={{ type: "text", text: "TND" }}
                textInputPlaceholder="20,263.063"
              />
            </View>

            <View style={[layout.col, { padding: 7.5, borderRadius: 10 }]}>
              <Text style={textStyle}>Ref Document</Text>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder="Ref Document"
                onChange={() => {}}
              />
            </View>
            <View style={[layout.col, { padding: 7.5, borderRadius: 10 }]}>
              <Text style={textStyle}>Type De reglement</Text>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder="Echeance"
                onChange={() => {}}
              />
            </View>
            <View style={[layout.col, { padding: 7.5, borderRadius: 10 }]}>
              <Text style={textStyle}>Date du document</Text>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder="date"
                onChange={() => {}}
                tag={{
                  type: "icon",
                  name: "calendar-month",
                  iconType: "MaterialIcons",
                }}
                onIconPress={() => {}}
              />
            </View>
            {/* /*<DatePicker name="dateDoc" style={{position:"absolute" ,top:8}}/> */}
          </ScrollView>
        </GrayCard>
      </View>
      <View style={{ alignSelf: "center", height: height / 10 }}>
        <Button />
      </View>
    </SafeAreaView>
  );
}
