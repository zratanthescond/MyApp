import { useTheme } from "@/theme";
import React, { Children, ReactNode } from "react";
import { View } from "react-native";

interface GrayCard {
  children: ReactNode;
  height?: number;
  width?: number;
}
export default function GrayCard({ children, height, width, style }: GrayCard) {
  const { borders, backgrounds, gutters, layout, colors } = useTheme();

  return (
    <View
      style={[
        backgrounds.gray100,
        layout.itemsCenter,
        borders.rounded_16,
        gutters.margin_12,
        layout.justifyAround,
        layout.col,
        gutters.paddingVertical_12,
        { height: height },
        style,
      ]}
    >
      {children}
    </View>
  );
}
