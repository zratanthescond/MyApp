import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import useAuth from "@/contexts/auth/useAuth";
import Login from "@/services/users/login";
import { useMutation } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import loginLogo from "../../theme/assets/images/loginLogo.png";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const storage = new MMKV();
  const savedCredentials = JSON.parse(storage.getString("credentials") || "{}");
  const biometricEnabled = storage.getBoolean("biometricEnabled") || false;
  const [email, setEmail] = React.useState(savedCredentials?.email || "");
  const [password, setPassword] = React.useState(savedCredentials?.password || "");

  const { colors, layout, backgrounds, gutters, fonts, borders } = useTheme();
  const navigation = useNavigation();
  const { setIsLogged } = useAuth();
  const rnBiometrics = new ReactNativeBiometrics();

  // React Query Mutation for Login
  const mutate = useMutation({
    mutationKey: ["login"],
    mutationFn: () => {
      return Login({ email, password });
    },
    onSuccess: async (data) => {
      // Save credentials and mark biometric as enabled
      storage.set("credentials", JSON.stringify({ email, password }));
      setIsLogged(true);
    },
    onError: (error) => {
      Alert.alert("Error", "Invalid credentials", [{ text: "Ok" }]);
    },
  });

  // Enable Biometric Authentication
  const enableBiometricAuth = () => {
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;

        if (available) {
          let biometricType = biometryType === BiometryTypes.TouchID ? "TouchID" :
            biometryType === BiometryTypes.FaceID ? "FaceID" : "Biometrics";

          Alert.alert(
            biometricType,
            `Would you like to enable ${biometricType} authentication for the next time?`,
            [
              {
                text: "Yes",
                onPress: () => {
                  storage.set("biometricEnabled", true);
                  Alert.alert("Success!", `${biometricType} authentication enabled successfully!`);
                },
              },
              { text: "Cancel", style: "cancel" },
            ]
          );
        } else {
          Alert.alert("Biometrics not supported", "This device does not support biometric authentication.");
        }
      })
      .catch(() => {
        Alert.alert("Error", "An error occurred while checking biometrics availability.");
      });
  };

  // Authenticate with Biometrics
  const authenticateWithBiometrics = () => {
    if (!biometricEnabled) {
      Alert.alert("Biometrics Disabled", "Enable biometric authentication first.");
      return;
    }

    rnBiometrics.simplePrompt({ promptMessage: "Authenticate with Biometrics" })
      .then((resultObject) => {
        const { success } = resultObject;

        if (success) {
          const { email, password } = savedCredentials;
          if (email && password) {
            mutate.mutate({ email, password });
          } else {
            Alert.alert("Error", "No credentials found for biometric authentication.");
          }
        } else {
          Alert.alert("Authentication Failed", "Biometric authentication was not successful.");
        }
      })
      .catch(() => {
        Alert.alert("Error", "An error occurred during biometric authentication.");
      });
  };

  // Styles
  const styles = StyleSheet.create({
    loginLogo: {
      height: height / 3,
      width: height / 3,
    },
    textInput: [
      {
        borderWidth: 1,
        borderColor: colors.gray200,
        width: "100%",
      },
      borders.rounded_16,
      gutters.marginBottom_12,
      gutters.padding_12,
    ],
  });

  return (
    <SafeScreen>
      <View style={[layout.flex_1, backgrounds.blue100]}>
        <View
          style={[layout.flex_1, gutters.paddingVertical_12, gutters.paddingHorizontal_12, layout.row, { maxHeight: 80 }]}
        >
          <TouchableOpacity
            style={[layout.flex_1, layout.row, layout.itemsCenter, { maxHeight: 80, gap: 15 }]}
          >
            <Text style={[{ color: colors.white }, fonts.bold, fonts.size_16]}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[layout.flex_1, backgrounds.white, { borderTopRightRadius: 30, borderTopLeftRadius: 30 }, gutters.padding_12, layout.itemsCenter, layout.col]}
        >
          <ImageBackground source={loginLogo} style={styles.loginLogo} resizeMode="stretch" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            placeholder="E-mail"
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ alignSelf: "flex-end" }}>
            <Text style={{ color: colors.blue100 }}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mutate.mutate({ email, password })}
            style={[backgrounds.blue100, layout.itemsCenter, gutters.padding_16, borders.rounded_16, gutters.marginVertical_16, { width: "100%" }]}
          >
            <Text style={[{ color: colors.white }, fonts.bold, fonts.size_16]}>Sign in</Text>
          </TouchableOpacity>
          <View
            style={[backgrounds.white, { borderTopRightRadius: 30, borderTopLeftRadius: 30 }, gutters.padding_12, layout.itemsCenter, layout.row, { gap: 16 },]}
          >
            <TouchableOpacity
              onPress={authenticateWithBiometrics}
              style={[backgrounds.blue100, layout.itemsCenter, gutters.padding_12, borders.rounded_16]}
            >
              <Text style={[{ color: colors.white }, fonts.bold, fonts.size_16]}>Sign in with Biometrics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={enableBiometricAuth}
              style={[backgrounds.blue100, layout.itemsCenter, gutters.padding_12, borders.rounded_16]}
            >
              <Text style={[{ color: colors.white }, fonts.bold, fonts.size_16]}>Enable Biometrics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}
