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
const BottomTab = ({ type, color, size = 24, isFocused, index, name }) => {
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
          colors={['#1C5585', '#4980A1', '#5D8FAD']}

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
};

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? "red" : "gray";

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
              size={24}
              color={color}
              name={route.name}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function ApplicationNavigator() {
  const { variant, navigationTheme, colors } = useTheme();
  //   const RenderTabBarIcon = ({
  //     focused,
  //     color,
  //     size,
  //     route,
  //   }: TabBarIconPropsType): JSX.Element => {
  //     let iconName = "";

  //     switch (route?.name) {
  //       case "home":
  //         iconName = focused ? "home" : "home-circle-outline";
  //         break;
  //       case "Tab B":
  //         iconName = focused ? "account-circle" : "account-circle-outline";
  //         break;
  //       default:
  //         break;
  //     }
  //     return <Icon name={iconName} size={size} color={color} />;
  //   };

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
