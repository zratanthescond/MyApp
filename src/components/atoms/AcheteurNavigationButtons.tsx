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
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
          backgrounds.blue100,
          borders.rounded_16,
          borders.w_1,
          borders.blue100,
          { padding: 10, elevation: 5, gap: 3 },
        ]}
      >
        <AppIcon
          type="AntDesign"
          name="addfolder"
          size={15}
          color={colors.white}
        />
        <Text
          style={[
            fonts.white,
            fonts.bold,
            fonts.size_12,

          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  );
}
