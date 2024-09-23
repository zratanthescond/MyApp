import { useTheme } from "@/theme";
import { ApplicationStackParamList } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Button({ label, outlined, onPress }) {
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const { height, width } = Dimensions.get("window");
  const navigation =
    useNavigation<StackNavigationProp<ApplicationStackParamList>>();

  const onHandlePress = () => {
    navigation.navigate("BordureauDetails");
  };
  return (
    <View style={[layout.row, gutters.marginTop_12]}>
      <TouchableOpacity
        onPress={() => onPress()}
        style={outlined ? styles.outlineButton : styles.ValideButton}
      >
        <Text style={outlined ? styles.TextAnnuler : styles.TextSuivant}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  outlineButton: {
    backgroundColor: "white",
    borderColor: "#013467",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    width: 150,
    marginRight: 30,
  },
  ValideButton: {
    backgroundColor: "#013467",
    borderColor: "#013467",

    borderRadius: 5,
    padding: 12,
    width: 150,
  },
  TextAnnuler: {
    color: "#013467",
    fontSize: 16,
    alignSelf: "center",
  },
  TextSuivant: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
  },
});
