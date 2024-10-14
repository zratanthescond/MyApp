import { SafeScreen } from "@/components/template";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import PaymentModeCard from "@/components/atoms/PaymentModeCard";
import { InputWithTag } from "@/components/atoms";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import Button from "@/components/atoms/form/Button";

export default function LimiteScreen() {
  const { layout, backgrounds, gutters, borders, fonts, colors } = useTheme();
  const textStyle = [
    fonts.bold,
    fonts.size_16,
    fonts.gray800,
    gutters.marginBottom_12,
  ];
  const progress = useSharedValue(50000);
  const min = useSharedValue(50000);
  const max = useSharedValue(500000);
  return (
    <SafeScreen>
      <View
        style={[
          layout.fullWidth,
          layout.fullHeight,
          backgrounds.white,
          gutters.padding_12,
          layout.flex_1,
        ]}
      >
        <Text style={textStyle}>Type de Financement</Text>
        <PaymentModeCard />
        <ScrollView
          style={layout.flex_1}
          contentContainerStyle={[gutters.paddingBottom_32]}
        >
          <View
            style={[
              backgrounds.gray100,
              borders.rounded_16,
              gutters.padding_12,
              layout.flex_1,
              layout.justifyAround,
              layout.itemsStart,
              gutters.padding_12,
              gutters.marginVertical_12,
            ]}
          >
            <Text style={textStyle}>Date de demande</Text>
            <InputWithTag
              titleWidth={0}
              tag={{ type: "icon", iconType: "AntDesign", name: "calendar" }}
            />
            <Text style={textStyle}>Date Limite</Text>
            <InputWithTag
              titleWidth={0}
              tag={{ type: "icon", iconType: "AntDesign", name: "calendar" }}
            />
            <Text style={textStyle}>Date de dernier demande</Text>
            <InputWithTag
              titleWidth={0}
              tag={{ type: "icon", iconType: "AntDesign", name: "calendar" }}
            />
          </View>
          <View
            style={[
              backgrounds.gray100,
              borders.rounded_16,
              gutters.padding_12,
              layout.flex_1,
              layout.justifyAround,
              layout.itemsStart,
              gutters.padding_12,
            ]}
          >
            <Text style={textStyle}>Limite Assurance</Text>
            <View style={[layout.row, layout.justifyBetween, layout.fullWidth]}>
              <Text style={[...textStyle, fonts.size_12]}>50000 Tnd</Text>
              <Text style={[...textStyle, fonts.size_12]}>500000 Tnd</Text>
            </View>
            <Slider
              theme={{
                disableMinTrackTintColor: colors.purple50,
                maximumTrackTintColor: colors.gray50,
                minimumTrackTintColor: colors.red500,
                cacheTrackTintColor: colors.white,
                bubbleBackgroundColor: colors.purple500,
                heartbeatColor: colors.purple500,
              }}
              style={[layout.flex_1, layout.fullWidth]}
              onValueChange={(value) => {
                progress.value = value;
              }}
              minimumValue={min}
              maximumValue={max}
              progress={progress}
            />
            <Text style={textStyle}>Limite Financement</Text>
            <View style={[layout.row, layout.justifyBetween, layout.fullWidth]}>
              <Text style={[...textStyle, fonts.size_12]}>50000 Tnd</Text>
              <Text style={[...textStyle, fonts.size_12]}>500000 Tnd</Text>
            </View>
            <Slider
              theme={{
                disableMinTrackTintColor: colors.purple50,
                maximumTrackTintColor: colors.gray50,
                minimumTrackTintColor: colors.purple500,
                cacheTrackTintColor: colors.white,
                bubbleBackgroundColor: colors.purple500,
                heartbeatColor: colors.purple500,
              }}
              style={[layout.flex_1, layout.fullWidth]}
              onValueChange={(value) => {
                progress.value = value;
              }}
              minimumValue={min}
              maximumValue={max}
              progress={progress}
            />
            <Text style={textStyle}>Date de demande</Text>
            <InputWithTag
              titleWidth={0}
              tag={{ type: "text", text: "jours" }}
            />
          </View>
          <View style={[layout.row, layout.justifyBetween, layout.fullWidth]}>
            <Button label="Annuler" outlined={true} />
            <Button label="Enregistrer" />
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
