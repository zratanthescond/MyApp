import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { G } from "react-native-svg";
import { InputWithTag } from "@/components/atoms";
import Button from "@/components/atoms/form/Button";

export default function ProfileUpdate() {
  const { colors, layout, backgrounds, fonts, gutters, borders } = useTheme();
  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          backgrounds.blue100,
          layout.justifyStart,
          layout.itemsCenter,
        ]}
      >
        <View
          style={[
            layout.itemsCenter,
            layout.justifyStart,
            { height: 100 },
            gutters.paddingVertical_12,
          ]}
        >
          <Text style={[fonts.white, fonts.bold, fonts.size_16]}>
            edit Profile
          </Text>
          <View
            style={[
              { height: 100, width: 100, borderRadius: 50, borderWidth: 5 },
              backgrounds.gray100,
              layout.itemsCenter,
              layout.justifyCenter,
              gutters.marginVertical_16,
              borders.white,
              layout.absolute,
              { top: 35, zIndex: 10 },
            ]}
          >
            <Text style={[fonts.white, fonts.bold, fonts.size_40]}>A</Text>
          </View>
        </View>
        <View
          style={[
            layout.flex_1,
            backgrounds.white,
            layout.fullWidth,
            gutters.padding_16,
          ]}
        >
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Nom
          </Text>
          <InputWithTag titleWidth={0} />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Prenom
          </Text>
          <InputWithTag titleWidth={0} />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Email
          </Text>
          <InputWithTag titleWidth={0} />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Phone number
          </Text>
          <InputWithTag titleWidth={0} />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            password
          </Text>
          <InputWithTag titleWidth={0} />
          <View
            style={[layout.fullWidth, layout.itemsCenter, layout.justifyCenter]}
          >
            <Button label="Valider" />
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}
