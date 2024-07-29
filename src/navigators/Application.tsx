import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Startup, Financement } from "@/screens";
import { useTheme } from "@/theme";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import type {
  ApplicationStackParamList,
  TabBarIconPropsType,
  HomeTabParamList,
} from "@/types/navigation";

import AppIcon, { Icons } from "../components/icons/AppIcons";
import { example, startup } from "@/translations/en";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderLogo from "@/components/header/HeaderLogo";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "@/types/theme/colors";
import React from "react";
import MyTabBar from "./components/MyTabBar";
import HomeTab from "./components/HomeTab";
import BordureauDetails from "@/screens/BordureauDetails/BordureauDetails";
import useAuth from "@/contexts/auth/useAuth";
import AuthStack from "./components/AthStack";
const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme, colors } = useTheme();
  const { isLogged } = useAuth();
  return isLogged === false ? (
    <AuthStack />
  ) : (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        key={variant}
        screenOptions={{
          headerMode: "screen",
          tabBarHideOnKeyboard: true,
          header: ({ navigation }) => <HeaderLogo navigation={navigation} />,
        }}
      >
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Example" component={HomeTab} />
        <Stack.Screen name="BordureauDetails" component={BordureauDetails} />
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
