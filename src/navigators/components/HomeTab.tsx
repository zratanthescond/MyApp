import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeTabParamList } from "@/types/navigation";
import { Example, Bordureau, Cartes, Virements, Dashboard } from "@/screens";
import MyTabBar from "./MyTabBar";
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
          // position: "absolute",
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
export default HomeTab;
