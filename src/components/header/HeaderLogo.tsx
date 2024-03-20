import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/theme";
import logo from "../../theme/assets/images/logo.png";

import { ImageVariant } from "../atoms";
import React from "react";
export default function HeaderLogo() {
  const { layout, backgrounds, gutters, colors } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.justifyAround,
        gutters.marginLeft_80,
        layout.itemsCenter,
        { height: 80 },
        layout.itemsCenter,
      ]}
    >
      <ImageVariant
        source={logo}
        style={{ height: 80, width: "60%", aspectRatio: 6 }}
      />
      <Icon name="bell-badge" size={30} color={colors.gray800} />
    </View>
  );
}
