import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import fr3 from "../../theme/assets/images/fr3.png";
import fr2 from "../../theme/assets/images/fr2.png";
import loginLogo from "../../theme/assets/images/loginLogo.png";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

export default function SpalashScreen() {
  const { colors, backgrounds, borders, gutters } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ImageBackground source={fr3} style={styles.fr3} resizeMode="stretch" />
      <ImageBackground
        source={fr2}
        style={{ ...styles.fr3, height: height }}
        resizeMode="stretch"
      />
      <ImageBackground
        source={loginLogo}
        style={styles.loginLogo}
        resizeMode="stretch"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={[
          backgrounds.blue100,
          borders.rounded_4,
          gutters.paddingVertical_12,
          gutters.paddingHorizontal_24,
          { width: width / 2 },
          { top: height / 4 },
        ]}
      >
        <Text style={{ color: colors.white, alignSelf: "center" }}>
          {" "}
          Get started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  fr3: {
    position: "absolute",
    width: width,
    height: height / 1.6,
    bottom: 0,
  },
  loginLogo: {
    height: height / 3,
    width: height / 3,
    top: height / 16,
  },
});
