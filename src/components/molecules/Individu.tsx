import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import WhiteCard from "../atoms/form/WhiteCard";
import { useTheme } from "@/theme";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import IndividuNavigation from "./IndividuNavigation";
import AppIcon from "../icons/AppIcons";
type Individu = {
  nom: string;
  prenom: string;
  individuId: number;

};
type IndividuProps = {
  individu: Individu;
  checkbox: boolean;
  navigation: boolean;
  onPress?: () => void;
  buyers: number[];
  pendingLimiteCount: number;

};
export default function IndividuComponent({
  individu,
  checkbox,
  onPress,
  navigation,
  buyers,
  pendingLimiteCount,
}: IndividuProps) {
  const checkboxStyle = {
    alignSelf: "flex-start",
    position: "absolute",
    top: -12,
    left: -12,
  };
  const [checked, setChecked] = React.useState<boolean>(false);
  useEffect(() => {
    if (buyers) setChecked(buyers.includes(individu.individuId));
  }, [buyers]);

  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={() => {
        onPress && onPress();
        setChecked(buyers.includes(individu.individuId));
      }}
    >
      <GrayCard >
        <WhiteCard
          style={[
            backgrounds.white,
            layout.col,
            layout.justifyBetween,
            gutters.marginHorizontal_16,
            layout.flex_1,
            gutters.padding_16,
            { gap: 20 },
          ]}

        //height={90}
        >
          {checkbox && (
            <View style={checkboxStyle}>
              <BouncyCheckbox
                isChecked={checked}
                fillColor={colors.blue100}
                unFillColor={colors.blue50}
                disabled={true}
              />
            </View>
          )}

          <View
            style={[
              layout.flex_1,
              layout.row,
              layout.justifyCenter,
              layout.justifyBetween,
              layout.itemsCenter,
              backgrounds.white,
              gutters.padding_16,
              borders.rounded_16,
              { gap: 20, elevation: 10, },
            ]}
          >
            <View
              style={[backgrounds.white, borders.rounded_16, { elevation: 10, padding: 5 }]}
            >
              <AppIcon
                type="Entypo"
                name="user"
                size={50}
                color={colors.blue50}
              />
            </View>
            <View style={[layout.flex_1, layout.col,]}>
              <View style={[layout.flex_1, layout.row]}>
                <Text style={[fonts.gray800, fonts.bold, fonts.size_12,]}>
                  Nom:{" "}
                </Text>
                <Text style={[fonts.gray800, fonts.bold, fonts.size_12]}>
                  {individu.nom}
                </Text>

              </View>

              <View style={[layout.flex_1, layout.row]}>
                <Text style={[fonts.gray800, fonts.bold, fonts.size_12]}>
                  Prenom:{" "}
                </Text>
                <Text style={[fonts.gray800, fonts.bold, fonts.size_12]}>
                  {individu.prenom}
                </Text>

              </View>
            </View>
          </View>

          {navigation && (
            <IndividuNavigation individuId={individu.individuId} pendingLimiteCount={pendingLimiteCount} />
          )}
        </WhiteCard>
      </GrayCard>
    </TouchableOpacity >
  );
}
