import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "@/theme";
import { Image } from "react-native-svg";
import AppIcon from "../icons/AppIcons";
import { MMKV } from "react-native-mmkv";
import { storage } from "@/App";
import useAuth from "@/contexts/auth/useAuth";
import Dropdown from "../atoms/Dropdown";
import { useNavigation } from "@react-navigation/native";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
export default function ProfileDrawer({ onClose }) {
  const { width, height } = Dimensions.get("window");
  const {
    colors,
    layout,
    borders,
    gutters,
    fonts,
    backgrounds,
    variant,
    changeTheme,
  } = useTheme();
  const onChangeTheme = () => {
    changeTheme(variant === "default" ? "dark" : "default");
  };
  const imageStyle = {
    height: 100,
    width: 100,
    backgroundColor: colors.gray200,
    borderRadius: 50,
  };
  const { setIsLogged } = useAuth();
  const user = storage.getString("user");
  const userObject = JSON.parse(user);
  const { t } = useTranslation(["drawer"]);
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback>
      <LinearGradient
        colors={[colors.blue100, colors.blue50]}
        style={[layout.fullHeight, { width: (width / 3) * 2 }]}
      >
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}
        >
          <AppIcon
            type="AntDesign"
            name="close"
            size={24}
            color={colors.white}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
        </TouchableOpacity>
        <View
          style={[
            //layout.flex_1,
            layout.col,
            layout.itemsCenter,
            layout.justifyCenter,
            gutters.padding_16,
          ]}
        >
          <View
            style={[
              imageStyle,
              { borderWidth: 5 },
              borders.white,
              layout.itemsCenter,
              layout.justifyCenter,
              gutters.margin_16,
            ]}
          >
            <Text
              style={[
                fonts.bold,
                fonts.size_40,
                fonts.alignCenter,
                fonts.white,
              ]}
            >
              {userObject.nom.charAt(0)}
            </Text>
          </View>
          <Text style={[fonts.bold, fonts.size_24, fonts.white]}>
            {userObject?.nom + " " + userObject?.prenom}
          </Text>
        </View>
        <View
          style={[
            layout.flex_1,
            layout.itemsStart,
            layout.justifyStart,
            gutters.padding_12,
          ]}
        >
          <Text style={[fonts.bold, fonts.size_16, fonts.white]}>{t("drawer:profile")}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileUpdate");
            }}
          >
            <View
              style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
                gutters.paddingVertical_12,
              ]}
            >
              <AppIcon
                type="AntDesign"
                name="user"
                size={25}
                color={colors.white}
              />
              <Text
                style={[
                  fonts.size_12,
                  fonts.bold,
                  fonts.white,
                  gutters.marginLeft_12,
                ]}
              >
                {t("drawer:edit_profile")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={[
              backgrounds.white,
              { height: 2, width: (width / 3) * 2 - 20, borderRadius: 200 },
              gutters.marginVertical_12,
            ]}
          />
          <Text style={[fonts.bold, fonts.size_16, fonts.white]}> {t("drawer:settings")}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsLogged(false);
            }}
          >
            <View
              style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
                gutters.paddingVertical_12,
              ]}
            >
              <AppIcon
                type="AntDesign"
                name="logout"
                size={25}
                color={colors.white}
              />
              <Text
                style={[
                  fonts.size_12,
                  fonts.bold,
                  fonts.white,
                  gutters.marginLeft_12,
                ]}
              >
                {t("drawer:logout")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={[
              backgrounds.white,
              { height: 2, width: (width / 3) * 2 - 20, borderRadius: 200 },
              gutters.marginVertical_12,
            ]}
          />
          <Text style={[fonts.bold, fonts.size_16, fonts.white]}>
            {t("drawer:preferences")}
          </Text>
          <View
            style={[
              layout.row,
              layout.itemsCenter,
              layout.justifyBetween,
              gutters.paddingVertical_12,
            ]}
          >
            <AppIcon
              type="Entypo"
              name="language"
              size={20}
              color={colors.white}
            />
            <Text
              style={[
                fonts.size_12,
                fonts.bold,
                fonts.white,
                gutters.marginLeft_12,
                gutters.marginRight_24,
              ]}
            >
              {t("drawer:languages")}
            </Text>
            <Dropdown data={["En", "Fr", "Ar"]} setSelected={(value: string) => { void i18next.changeLanguage(value.toLocaleLowerCase()); }} />
          </View>
          <TouchableOpacity
            onPress={() => {
              onChangeTheme();
            }}
          >
            <View
              style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
                gutters.paddingVertical_12,
              ]}
            >
              {variant === "default" ? (
                <AppIcon
                  type="MaterialIcons"
                  name="dark-mode"
                  size={20}
                  color={colors.white}
                />
              ) : (
                <AppIcon
                  type="MaterialIcons"
                  name="light-mode"
                  size={20}
                  color={colors.white}
                />
              )}

              <Text
                style={[
                  fonts.size_12,
                  fonts.bold,
                  fonts.white,
                  gutters.marginLeft_12,
                ]}
              >
                {variant === "default" ? t("drawer:darkMode") : t("drawer:light-mode")}

              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
