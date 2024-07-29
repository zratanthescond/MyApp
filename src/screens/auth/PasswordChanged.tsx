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
import loginLogo from "../../theme/assets/images/passChange.png";

const { width, height } = Dimensions.get("window");
export default function PasswordChanged() {
  const { layout, backgrounds, colors, gutters, fonts, borders } = useTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    loginLogo: {
      height: height / 3,
      width: width - 24,
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
              Password changed
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

          <Text
            style={[
              { color: colors.blue50 },
              fonts.size_16,
              fonts.bold,
              gutters.paddingHorizontal_12,
            ]}
          >
            Password changed successfully
          </Text>

          <Text
            style={[
              { alignSelf: "flex-start", color: colors.gray800 },
              fonts.size_12,
              fonts.bold,
              gutters.padding_12,
            ]}
          >
            you have successfully changed your password. please use the new
            password when you sign in
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={[
              backgrounds.blue100,
              layout.itemsCenter,
              gutters.padding_16,
              borders.rounded_16,
              gutters.marginVertical_16,
              { minWidth: "90%" },
            ]}
          >
            <Text style={[{ color: colors.white }, fonts.bold, fonts.size_12]}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}
