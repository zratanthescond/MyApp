import React from "react";
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
};
export default function IndividuComponent({
  individu,
  checkbox,
  onPress,
  navigation,
}: IndividuProps) {
  const checkboxStyle = {
    alignSelf: "flex-start",
    position: "absolute",
    top: -12,
    left: -12,
  };
  const [checked, setChecked] = React.useState<boolean>(false);
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  // console.log(individu);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
        setChecked(!checked);
      }}
    >
      <GrayCard>
        <WhiteCard
          style={[
            layout.col,
            layout.justifyBetween,
            gutters.marginHorizontal_16,

            layout.itemsCenter,
            gutters.padding_16,
          ]}
          height={90}
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
              layout.row,

              layout.fullWidth,
              gutters.paddingBottom_12,
              layout.left0,
              gutters.paddingHorizontal_16,
              { gap: 10 },
            ]}
          >
            <View
              style={[backgrounds.blue100, borders.rounded_4, { padding: 1 }]}
            >
              <AppIcon
                type="AntDesign"
                name="user"
                size={15}
                color={colors.white}
              />
            </View>

            <Text style={[fonts.blue100, fonts.bold, fonts.size_16]}>
              {individu.nom}
            </Text>
            <Text style={[fonts.blue100, fonts.bold, fonts.size_16]}>
              {individu.prenom}
            </Text>
          </View>

          {navigation && (
            <IndividuNavigation individuId={individu.individuId} />
          )}
        </WhiteCard>
      </GrayCard>
    </TouchableOpacity>
  );
}
