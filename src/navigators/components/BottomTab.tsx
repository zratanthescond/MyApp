import AppIcon from "@/components/icons/AppIcons";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
LinearGradient;
export default function BottomTab({
  type,
  color,
  size = 24,
  isFocused,
  index,
  name,
}) {
  let icon = "home";
  switch (index) {
    case 0:
      icon = "home";

      break;
    case 1:
      icon = "folder";
      break;
    case 3:
      icon = "credit-card";
      break;
    case 4:
      icon = "bank-transfer";
    default:
      break;
  }
  //const icon = index == 0 ? "home" : "heart";
  const gradient = index == 2;
  return (
    <View>
      {gradient ? (
        <LinearGradient
          colors={["#1C5585", "#4980A1", "#5D8FAD"]}
          end={{ x: 0.6, y: 0.8 }}
          start={{ x: 1, y: 0.8 }}
          style={styles.middleIcon}
        >
          <AppIcon name={"plus"} type={type} size={30} color={"white"} />
        </LinearGradient>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <AppIcon
            style={{ alignSelf: "center" }}
            name={icon}
            type={type}
            size={size}
            color={color}
          />
          <Text style={{ color: "blue", textAlign: "center" }}>{name}</Text>
        </View>
      )}
    </View>
  );
}
