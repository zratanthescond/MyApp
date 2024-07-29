import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeTabParamList } from "@/types/navigation";
import { Example, Bordureau, Cartes, Financement, Dashboard } from "@/screens";
import MyTabBar from "./MyTabBar";
import React from "react";
import BordureauDetails from "@/screens/BordureauDetails/BordureauDetails";

const HomeTab = (): JSX.Element => {
  const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
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
      <Screen name="Financement" component={Financement} />
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
};
export default HomeTab;
