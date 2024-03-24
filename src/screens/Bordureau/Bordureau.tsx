import useTheme from "@/theme/hooks/useTheme";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Layout } from "react-native-reanimated";
import Formulaire from "./form";

export default function Bordureau() {
    const { gutters, borders, layout,backgrounds ,fonts} = useTheme();
     const { height, width } = Dimensions.get("window");
  return (
    <SafeAreaView style={{ flex: 1 }}>
   <View  style={[
            layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.white ,
        {borderTopLeftRadius: 80}]}>
   
      <Text style={[{ flex:1,color:'#062340', fontSize: 20},layout.itemsCenter,fonts.bold ,gutters.marginTop_24]}>Nouvelle Bordureau</Text>
        <View
      style={[
        gutters.padding_12,
        backgrounds.gray100,
        layout.itemsCenter,
        borders.rounded_16,
        gutters.margin_12,
        gutters.marginBottom_40,
        layout.justifyAround,
        layout.col,
        { width: width - 24, height: height - ( height / (6/2)) },
      ]}
    >
      <Formulaire />
    </View>
     </View>
   </SafeAreaView>
  );
}
