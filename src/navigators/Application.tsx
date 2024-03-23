import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import {
  Example,
  Startup,
  Bordureau,
  Cartes,
  Virements,
  Dashboard,
} from "@/screens";
import { useTheme } from "@/theme";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import type {
  ApplicationStackParamList,
  TabBarIconPropsType,
  HomeTabParamList,
} from "@/types/navigation";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import AppIcon, { Icons } from "../components/icons/AppIcons";
import { example, startup } from "@/translations/en";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderLogo from "@/components/header/HeaderLogo";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "@/types/theme/colors";
import React from "react";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme, colors } = useTheme();

  const HomeTab = (): JSX.Element => {
    const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

    return (
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            width: "95%",
            alignSelf: "center",
            bottom: 10,
            borderRadius: 5,
          },
        }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Screen name="home" component={Example} />
        <Screen name="bordureau" component={Bordureau} />
        <Screen name="Cartes" component={Cartes} />
        <Screen name="Virements" component={Virements} />
        <Screen name="Dashboard" component={Dashboard} />
      </Navigator>
    );
  };
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        key={variant}
        screenOptions={{
          headerMode: "screen",
          header: ({ navigation }) => <HeaderLogo navigation={navigation} />,
        }}
      >
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Example" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
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
  middleIcon: {
    bottom: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 8,
  },
});
export default ApplicationNavigator;
