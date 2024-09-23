import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import BottomTab from "./BottomTab";
import { Icons } from "@/components/icons/AppIcons";
import NavigatorModal from "./NavigatorModal";

export default function MyTabBar({ state, descriptors, navigation }) {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const tabWidth = getWidth();
  const [modalVisible, setModalVisible] = useState(false);
  const translateX = tabOffsetValue.interpolate({
    inputRange: [0, state.routes.length - 1],
    outputRange: [0, tabWidth * (state.routes.length - 1)],
  });

  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          if (index === 2) {
            setModalVisible(!modalVisible);
          } else {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }
        };

        const color = isFocused ? "#062340" : "gray";

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            testID={options.tabBarTestID}
            accessibilityRole="button"
          >
            <BottomTab
              type={
                index !== 2 ? Icons.MaterialCommunityIcons : Icons.FontAwesome5
              }
              index={index}
              isFocused={isFocused}
              size={30}
              color={color}
              name={route.name}
              modalVisible={modalVisible}
            />
          </TouchableOpacity>
        );
      })}
      <NavigatorModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    alignSelf: "center",
    bottom: 10,
    borderRadius: 5,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    backgroundColor: "red",
    borderRadius: 2,
  },
});

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 80;
  return width / 5;
}
