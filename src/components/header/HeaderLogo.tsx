import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/theme";
import logo from "../../theme/assets/images/logo.png";

import { ImageVariant } from "../atoms";
import React from "react";
import { useNavigation } from "@react-navigation/native";
export default function HeaderLogo() {
  const { layout, backgrounds, gutters, colors } = useTheme();
  const naivigation = useNavigation();
  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,

        gutters.marginHorizontal_24,
        layout.itemsStart,
        { height: 80 },
        layout.itemsCenter,
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          naivigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={30} color={colors.gray800} />
      </TouchableOpacity>

      <ImageVariant
        source={logo}
        style={{ height: 80, width: "60%", aspectRatio: 6 }}
      />
      <Icon name="bell-badge" size={30} color={colors.gray800} />
    </View>
  );
}
