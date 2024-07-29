import AppIcon, { Icons } from "@/components/icons/AppIcons";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import React from "react";

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
} from "react-native";
import loginLogo from "../../theme/assets/images/loginLogo.png";

const { width, height } = Dimensions.get("window");
export default function VerifyCode() {
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
        minWidth: "70%",
      },
      borders.rounded_16,
      gutters.margin_12,
      gutters.padding_12,
    ],
    cardShadow: {
      borderRadius: 20,
      backgroundColor: "transparent",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 20,
    },
  });
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
              Verify code
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
                  style={{
                    alignSelf: "flex-start",
                    color: colors.gray200,
                  }}
                >
                  Type Code
                </Text>
                <View style={[layout.row, layout.itemsCenter]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Code"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={[
                      backgrounds.blue100,
                      layout.flex_1,
                      gutters.padding_12,
                      borders.rounded_16,
                    ]}
                  >
                    <Text style={[{ color: colors.white }, fonts.bold]}>
                      Resend
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    { color: colors.gray200 },
                    fonts.bold,
                    fonts.size_12,
                    gutters.margin_12,
                  ]}
                >
                  We texted you a code to verify you phone number(+216) *****499
                  {"\n"}
                  {"\n"}
                  this code will be expired after 10 minutes after this message.
                  press resend button if you don't get a message
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("changePassword")}
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
                    Change password
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
