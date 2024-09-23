import { View, Dimensions, ViewStyle } from "react-native";
import { useTheme } from "@/theme";
import React, { ReactNode } from "react";
import { Style } from "util";

interface WhiteCardProps {
  children: ReactNode;
  height?: number;
  flex?: boolean;
  style?: Style;
}
export default function WhiteCard({
  children,
  height,
  flex,
  style,
}: WhiteCardProps) {
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const flexDirection = flex == null ? layout.row : layout.col;
  return (
    <View
      style={[
        layout.flex_1,
        backgrounds.white,
        borders.rounded_16,
        layout.itemsCenter,
        layout.justifyAround,
        flexDirection,
        { paddingHorizontal: 15, height: height, marginVertical: 7.5 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
