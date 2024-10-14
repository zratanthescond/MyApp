import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import AcheteurNavigationButtons from "../atoms/AcheteurNavigationButtons";
type Props = {
  individuId: number;
};
export default function IndividuNavigation({ individuId }: Props) {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={[
        layout.row,
        layout.fullWidth,
        layout.itemsCenter,
        layout.flex_1,
        layout.justifyAround,
        // layout.absolute,
        // { bottom: -12 },
        gutters.paddingHorizontal_16,
      ]}
    >
      <AcheteurNavigationButtons
        label="Litige"
        onPress={() => {
          navigation.navigate({
            name: "Factures",
            params: { individuId: individuId } as { individuId: number },
          });
        }}
      />
      <AcheteurNavigationButtons
        label="Prorogation"
        onPress={() => {
          navigation.navigate("Factures");
        }}
      />
      <AcheteurNavigationButtons
        label="Limite"
        onPress={() => {
          navigation.navigate("Limite");
        }}
      />
    </View>
  );
}
