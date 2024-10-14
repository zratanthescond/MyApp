import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "@/theme";
import AppIcon from "../icons/AppIcons";
type Props = {
  label: string;
  onPress: () => void;
};
export default function AcheteurNavigationButtons({ label, onPress }: Props) {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  return (
    <TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          backgrounds.white,
          borders.rounded_16,
          gutters.paddingHorizontal_12,
          { paddingVertical: 5, elevation: 5 },
        ]}
      >
        <AppIcon
          type="AntDesign"
          name="addfolder"
          size={15}
          color={colors.gray800}
        />
        <Text
          style={[
            fonts.gray800,
            fonts.bold,
            fonts.size_12,
            gutters.marginLeft_12,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  );
}
