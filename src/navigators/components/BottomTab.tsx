import AppIcon from "@/components/icons/AppIcons";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function BottomTab({ type, color, size = 24, index, name }) {
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
      icon = "folder";
      break;
  }
  const gradient = index === 2;

  return (
    <View>
      {gradient ? (
        <LinearGradient
          colors={["#1C5585", "#4980A1", "#5D8FAD"]}
          end={{ x: 0.6, y: 0.8 }}
          start={{ x: 1, y: 0.8 }}
          style={styles.middleIcon}
        >
          <AppIcon name={"plus"} type={type} size={20} color={"white"} />
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
          <Text
            style={{
              color: "#062340",
              textAlign: "center",
              fontFamily: "lato",
              fontSize: 11,
            }}
          >
            {name}
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  middleIcon: {
    bottom: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 2,
  },
});
