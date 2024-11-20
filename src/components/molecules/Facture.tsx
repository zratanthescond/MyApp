import React from "react";
import { Alert, Text, View } from "react-native";
import { useTheme } from "@/theme";
import CircularProgress from "react-native-circular-progress-indicator";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import WhiteCard from "../atoms/form/WhiteCard";
import AcheteurNavigationButtons from "../atoms/AcheteurNavigationButtons";
import AppIcon from "../icons/AppIcons";

export default function FactureComponent({ onButtonPress, facture, litigeCount, prorogationCount }: { onButtonPress: () => void, facture: any, litigeCount: number, prorogationCount: number }) {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();

  const rowViewStyle = [
    layout.col,
    layout.justifyBetween,
    layout.fullWidth,

    layout.itemsCenter,
  ];
  const LeftViewStyle = [
    layout.row,
    layout.justifyBetween,
    layout.fullWidth,
    gutters.padding_12,
    layout.itemsStart
  ];

  const buttonViewStyle = [
    layout.row,
    layout.justifyBetween,
    layout.fullWidth,
    gutters.padding_12,
    layout.itemsCenter,
  ];
  const TextStyle = [fonts.bold, fonts.size_16, fonts.gray400];
  const ValueTextStyle = [fonts.bold, fonts.size_16, { color: colors.dark }];
  const LabelTextStyle = [fonts.regular, fonts.size_14, colors.gray500];

  return (
    facture ? (
      <View style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter]}>
        <WhiteCard style={[borders.rounded_16, { borderColor: colors.primary, borderWidth: 1 }]}>
          <View style={{ padding: 16 }}>
            {/* Header with Ref and Circular Progress */}
            <View style={rowViewStyle}>
              <Text style={TextStyle}>Ref Facture: {facture.refFacture || "N/A"}</Text>

            </View>

            {/* Date and Revenue Row */}
            <View style={LeftViewStyle}>

              <Text style={LabelTextStyle}>
                <AppIcon name="calendar-check" type="MaterialCommunityIcons" size={20} color={colors.blue100} />

                Date: {facture.dateFacture ? new Date(facture.dateFacture).toLocaleDateString("en-US") : "N/A"}
              </Text>
            </View>
            {/* Divider */}
            <View style={[layout.fullWidth, backgrounds.gray100, { height: 1, marginVertical: 4 }]} />
            <View style={LeftViewStyle}>


              <Text style={ValueTextStyle}>
                <AppIcon name="currency-usd" type="MaterialCommunityIcons" size={20} color={colors.blue100} />
                Montant Doc: {facture.montantDocument || "0"} TND</Text>
            </View>

            {/* Divider */}
            <View style={[layout.fullWidth, backgrounds.gray100, { height: 1, marginVertical: 4 }]} />

            {/* TTC and Ouvert Row */}
            <View style={LeftViewStyle}>
              <Text style={ValueTextStyle}>
                <AppIcon name="credit-card-fast" type="MaterialCommunityIcons" size={20} color={colors.blue100} />

                Mode Reglement : {facture.modeReglement}</Text>

              {/* Divider */}
            </View>
            <View style={[layout.fullWidth, backgrounds.gray100, { height: 1, marginVertical: 4 }]} />
            <View style={LeftViewStyle}>
              <Text style={ValueTextStyle}>
                <AppIcon name="credit-card-clock-outline" type="MaterialCommunityIcons" size={20} color={colors.blue100} />

                Echéance :{facture.echeance} jours</Text>
            </View>

            {/* Navigation Buttons */}
            <View style={[...buttonViewStyle, { gap: 20 }]}>
              {litigeCount > 0 ?
                <AcheteurNavigationButtons
                  label={` in progress (${litigeCount})`}
                  onPress={() => Alert.alert('Error', 'Vous avez une litige en cours ', [{ text: 'OK', onPress: () => { } }],)}
                /> : <AcheteurNavigationButtons
                  label="Litige"
                  onPress={() => onButtonPress("litige", facture.factureId)}
                />}
              {prorogationCount > 0 ?
                <AcheteurNavigationButtons
                  label={` in progress (${prorogationCount})`}
                  onPress={() => Alert.alert('Error', 'Vous avez une prorogation en cours ', [{ text: 'OK', onPress: () => { } }],)}
                /> : <AcheteurNavigationButtons
                  label="prorogation"
                  onPress={() => onButtonPress("prorogation", facture.factureId)}
                />}
            </View>
          </View>
        </WhiteCard>
      </View>
    ) : (
      <GrayCard>
        <WhiteCard>
          <Text style={TextStyle}>Aucune facture disponible.</Text>
        </WhiteCard>
      </GrayCard>
    )
  );
}
