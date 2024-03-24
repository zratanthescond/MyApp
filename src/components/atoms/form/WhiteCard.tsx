import { View, Dimensions } from "react-native";
import { useTheme } from "@/theme";
export default function WhiteCard({ children, height, flex }) {
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
      ]}
    >
      {children}
    </View>
  );
}
