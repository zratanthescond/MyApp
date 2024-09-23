import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";
import { Icons } from "@/components/icons/AppIcons";
import AppIcon from "@/components/icons/AppIcons";
import loginLogo from "../../theme/assets/images/loginLogo.png";
import { useNavigation } from "@react-navigation/native";
import useAuth from "@/contexts/auth/useAuth";
import Login from "@/services/users/login";
import { useMutation, useQuery } from "@tanstack/react-query";
const { height, width } = Dimensions.get("window");
export default function LoginScreen() {
  const [email, setEmail] = React.useState("anwar@gmail.com");
  const [password, setPassword] = React.useState("anwar456");
  const { colors, layout, backgrounds, gutters, fonts, borders } = useTheme();
  const navigation = useNavigation();
  const { setIsLogged } = useAuth();

  const mutate = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      setIsLogged(true);
    },
    onError: (error) => {
      console.log(error.responce.data);
    },
  });
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
          style={[
            layout.flex_1,
            gutters.paddingVertical_12,
            gutters.paddingHorizontal_12,
            layout.row,
            { maxHeight: 80 },
          ]}
        >
          <TouchableOpacity
            style={[
              layout.flex_1,
              layout.row,
              layout.itemsCenter,
              { maxHeight: 80, gap: 15 },
            ]}
          >
            <AppIcon
              type={Icons.AntDesign}
              name="left"
              color={colors.white}
              size={16}
            />
            <Text style={[{ color: colors.white }, fonts.bold, fonts.size_16]}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            layout.flex_1,
            backgrounds.white,
            { borderTopRightRadius: 30, borderTopLeftRadius: 30 },
            gutters.padding_12,
            layout.itemsCenter,
            layout.col,
          ]}
        >
          <ImageBackground
            source={loginLogo}
            style={styles.loginLogo}
            resizeMode="stretch"
          />
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
            placeholder="password"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Text style={{ color: colors.blue100 }}>
              Forgot your password ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mutate.mutate({ email: email, password: password })}
            style={[
              backgrounds.blue100,
              layout.itemsCenter,
              gutters.padding_16,
              borders.rounded_16,
              gutters.marginVertical_16,
              { width: "100%" },
            ]}
          >
            <Text style={[{ color: colors.white }, fonts.bold, fonts.size_16]}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}
