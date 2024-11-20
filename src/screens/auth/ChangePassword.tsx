import AppIcon, { Icons } from "@/components/icons/AppIcons";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import React, { useEffect } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import loginLogo from "../../theme/assets/images/loginLogo.png";
import { on } from "events";
import { use } from "i18next";
import { useMutation } from "@tanstack/react-query";
import { default as ChangePasswordService } from "@/services/ForgetPassword/ChangePassword";
const { width, height } = Dimensions.get("window");
export default function ChangePassword() {
  const { params: { phoneNumber, code } }: any = useRoute();


  const { layout, backgrounds, colors, gutters, fonts, borders } = useTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    loginLogo: {
      height: height / 3,
      width: height / 3,
    },
    textInput: [
      {
        borderWidth: 1,
        borderColor: colors.gray200,
        minWidth: "90%",
      },
      borders.rounded_16,
      gutters.margin_12,
      gutters.padding_12,
    ],
    cardShadow: {
      borderRadius: 20,
      backgroundColor: "transparent",

      elevation: 100,
    },
  });
  const ResetPassword = useMutation({
    mutationKey: ["ResetPassword"],
    mutationFn: () => {
      return ChangePasswordService({ code: code, newPassword: password, phoneNumber: phoneNumber });
    },
    onSuccess: (data) => {
      //console.log(data);
      navigation.navigate("PasswordChanged");
    },
    onError: (error) => {
      //console.log(error);
    },
  })
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  useEffect(() => {
    //console.log(password);
  }, [password]);
  return (
    <SafeScreen>
      <View style={[layout.flex_1, backgrounds.white]}>
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
            onPress={() => navigation.goBack()}
          >
            <AppIcon
              type={Icons.AntDesign}
              name="left"
              color={colors.gray800}
              size={16}

            />
            <Text
              style={[{ color: colors.gray800 }, fonts.bold, fonts.size_16]}
            >
              Forgot password
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
          <KeyboardAvoidingView>
            <View style={styles.cardShadow}>
              <View
                style={[
                  layout.itemsCenter,
                  layout.col,
                  backgrounds.white,
                  borders.blue50,
                  gutters.padding_12,
                  gutters.margin_12,
                  borders.red500,
                  borders.w_1,
                  borders.rounded_16,
                ]}
              >
                <Text
                  style={[
                    { alignSelf: "flex-start", color: colors.gray200 },
                    fonts.size_12,
                    fonts.bold,
                    gutters.paddingHorizontal_12,
                  ]}
                >
                  Type your new password
                </Text>
                <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Your new Password"
                  onChangeText={(text) => setPassword(text)}
                />
                <Text
                  style={[
                    { alignSelf: "flex-start", color: colors.gray200 },
                    fonts.size_12,
                    fonts.bold,
                    gutters.padding_12,
                  ]}

                >
                  Confirm password
                </Text>
                <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Confirm your new Password" onChangeText={(text) => setConfirmPassword(text)} />
                <TouchableOpacity
                  onPress={() => ResetPassword.mutate()}
                  style={[
                    backgrounds.blue100,
                    layout.itemsCenter,
                    gutters.padding_16,
                    borders.rounded_16,
                    gutters.marginVertical_16,
                    { minWidth: "90%" },
                  ]}
                >
                  <Text
                    style={[{ color: colors.white }, fonts.bold, fonts.size_12]}
                  >
                    Change Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeScreen>
  );
}
