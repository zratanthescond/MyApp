import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/theme";
import CircularProgress from "react-native-circular-progress-indicator";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import WhiteCard from "../atoms/form/WhiteCard";
import AcheteurNavigationButtons from "../atoms/AcheteurNavigationButtons";

export default function FactureComponent({ onButtonPress, facture }) {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  const rowViewStyle = [
    layout.row,
    layout.justifyBetween,
    layout.fullWidth,
    gutters.padding_12,
    layout.itemsCenter,
  ];

  const TextStyle = [fonts.bold, fonts.size_16, fonts.gray400];
  return (
    <GrayCard>
      <WhiteCard>
        <View>
          <View style={rowViewStyle}>
            <Text style={TextStyle}>Ref Facture: {facture.refFacture}</Text>
            <CircularProgress
              value={50}
              radius={20}
              activeStrokeColor={colors.blue100}
              showProgressValue={false}
            />
          </View>
          <View style={rowViewStyle}>
            <Text style={TextStyle}>
              {new Date(facture.dateFacture).toLocaleDateString("en-US")}
            </Text>
            <Text style={TextStyle}>Revenue 587475</Text>
          </View>
          <View
            style={[layout.fullWidth, backgrounds.gray100, { height: 2 }]}
          />
          <View style={rowViewStyle}>
            <Text style={TextStyle}>TTC : 8,7558314</Text>
            <Text style={TextStyle}> Ouvert : 8,52435455</Text>
          </View>
          <View style={rowViewStyle}>
            <AcheteurNavigationButtons
              label="Litige"
              onPress={() => {
                onButtonPress("litige");
              }}
            />
            <AcheteurNavigationButtons
              label="Prorogation"
              onPress={() => {
                onButtonPress("prorogation");
              }}
            />
          </View>
        </View>
      </WhiteCard>
    </GrayCard>
  );
}
