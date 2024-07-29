import ChangePassword from "@/screens/auth/ChangePassword";
import ForgotPassword from "@/screens/auth/ForgotPassword";
import LoginScreen from "@/screens/auth/LoginScreen";
import SpalashScreen from "@/screens/auth/SplashScreen";
import VerifyCode from "@/screens/auth/VerifyCode";
import PasswordChanged from "@/screens/auth/PasswordChanged";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" component={SpalashScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="verifyCode" component={VerifyCode} />
        <Stack.Screen name="changePassword" component={ChangePassword} />
        <Stack.Screen name="passwordChanged" component={PasswordChanged} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
