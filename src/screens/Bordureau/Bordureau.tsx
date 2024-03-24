import useTheme from "@/theme/hooks/useTheme";
import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Formulaire from "./form";

export default function Bordureau() {
    const { gutters, borders, layout,backgrounds ,fonts} = useTheme();
     const { height, width } = Dimensions.get("window");
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ScrollView   keyboardShouldPersistTaps="handled" >
   <View  style={[
            layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.white ,
        
        {borderTopLeftRadius: 80,paddingBottom:300}]}>
   
      <Text style={[{ flex:1,color:'#013467', marginBottom:30,fontSize: 20},layout.itemsCenter,fonts.bold ,gutters.marginTop_24]}>Nouvelle Bordureau</Text>
       
      <Formulaire />
 
     </View>
     </ScrollView>
   </SafeAreaView>
  );
}
