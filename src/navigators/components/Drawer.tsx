import { Example, Startup } from "@/screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        defaultStatus="open"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Feed" component={Startup} />
        <Drawer.Screen name="Article" component={Example} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
