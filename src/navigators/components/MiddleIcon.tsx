import AppIcon from "@/components/icons/AppIcons";
import { TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

const { height, width } = Dimensions.get("window");
export default function MiddleIcon({
  modalVisible,
  setModalVisible,
  center,
  bottom,
  color,
  icon,
  onPress,
}) {
  const styles = StyleSheet.create({
    middleIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.6,
      elevation: 2,

      zIndex: 1000,
      ...(center && { alignSelf: "center", bottom: -height / 8 }),
      ...(bottom && { bottom: bottom }),
    },
  });
  return (
    <LinearGradient
      colors={[
        (color && color[0]) || "#1C5585",
        (color && color[1]) || "#4980A1",
        (color && color[2]) || "#5D8FAD",
      ]}
      end={{ x: 1, y: 0.9999 }}
      start={{ x: 1, y: 0.9999 }}
      style={styles.middleIcon}
    >
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible) || onPress()}
      >
        <AppIcon
          name={icon || "close"}
          type={"AntDesign"}
          size={40}
          color={"white"}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}
