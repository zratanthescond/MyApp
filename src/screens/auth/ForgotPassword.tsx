import AppIcon, { Icons } from "@/components/icons/AppIcons";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import loginLogo from "../../theme/assets/images/loginLogo.png";
import { use } from "i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import SendNumber from "@/services/ForgetPassword/SendNumber";

const { width, height } = Dimensions.get("window");
export default function ForgotPassword() {
  const { layout, backgrounds, colors, gutters, fonts, borders } = useTheme();
  const navigation = useNavigation();
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["SendNumber"],
    mutationFn: () => {
      return SendNumber(PhoneNumber);
    },
    onSuccess: (data) => {
      //console.log(data);
      Alert.alert("success", "Un message a été envoyé a votre numéro " + PhoneNumber, [{ text: "Ok", onPress: () => navigation.navigate("verifyCode", { phoneNumber: PhoneNumber }) }]);

    },
    onError: (error) => {
      Alert.alert("error", "Le numéro n'est pas correct", [{ text: "Ok" }]);
      //console.log(error);
    },
  })
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



      elevation: 40,
    },
  });
  const [PhoneNumber, setPhoneNumber] = React.useState<string>("");
  useEffect(() => {
    //console.log(PhoneNumber);

  }, [PhoneNumber]);

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
                <TextInput
                  style={styles.textInput}
                  placeholder="Your phone number"
                  keyboardType="numeric"
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={PhoneNumber}
                />
                <Text
                  style={[{ color: colors.gray800 }, fonts.bold, fonts.size_16]}
                >
                  We texted you a code to verify you phone number
                </Text>
                <TouchableOpacity
                  onPress={() => mutate()}
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
                    style={[{ color: colors.white }, fonts.bold, fonts.size_16]}
                  >
                    Send
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
