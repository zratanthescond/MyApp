import AppIcon from "@/components/icons/AppIcons";
import React from "react";
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
  left,
  iconType,
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
      elevation: 20,
      left: left ? left : 0,

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
      locations={[0, 0.5, 0.6]}
      start={{ x: 0.25, y: 0.25 }}
      end={{ x: 0.5, y: 0.5 }}
      style={styles.middleIcon}
      useAngle={true}
      angle={20}
    >
      <TouchableOpacity onPress={() => onPress()}>
        <AppIcon
          name={icon || "close"}
          type={iconType || "MaterialCommunityIcons"}
          size={40}
          color={"white"}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}
