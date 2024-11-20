import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeTabParamList } from "@/types/navigation";
import { Example, Bordureau, Cartes, Financement, Dashboard } from "@/screens";
import MyTabBar from "./MyTabBar";
import React from "react";
import BordureauDetails from "@/screens/BordureauDetails/BordureauDetails";
import MyDrawer from "./Drawer";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

function HomeTab(): JSX.Element {
  const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();
  const { t } = useTranslation(["bottomTab"]);

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
      <Screen name={t("bottomTab:dashboard")} component={Dashboard} />
      <Screen name={t("bottomTab:bordereau")} component={Bordureau} />
      <Screen name="carte " component={Cartes} />
      <Screen name={t("bottomTab:financement")} component={Financement} />
      <Screen name={t("bottomTab:profile")} component={MyDrawer} />
    </Navigator>
  );
}
export default HomeTab;
