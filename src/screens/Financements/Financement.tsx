import React from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import BackgroundDispoCard from "@/components/molecules/BackgroundDispoCard";
import PaymentModeCard from "@/components/atoms/PaymentModeCard";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import { InputWithTag } from "@/components/atoms";
import Button from "@/components/atoms/form/Button";
const Financement = () => {
    const { height, width } = Dimensions.get("window");
     const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
      const textStyle = [
    fonts.gray800,
    fonts.bold,
    { paddingVertical: 10 },
    { paddingHorizontal: 5 },
  ];
  return (
    <SafeAreaView style={{ flex: 1,marginVertical: 2 }}>
      <BackgroundDispoCard 
        text1={"Financement"}
        text2={"Libération"}
      />

       <PaymentModeCard />
       <GrayCard >
           <View
              style={[
                
                backgrounds.white,
                layout.row,
                { marginHorizontal: 7.5, padding: 7.5, borderRadius: 10 },
              ]}
            >
              
              <InputWithTag
                title={"Montant Doc"}
                inputDisabled={true}
                tag={{ type: "text", text: "TND" }}
                textInputPlaceholder={"20,263.063"}
              />
            </View>

            
            < View style={[layout.row, { padding: 7.5, borderRadius: 10 }]}>
               <Text style={textStyle}>Date du document</Text>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder={"22/02/1999"}
                onChange={() => {}}
                tag={{
                  type: "icon",
                  name: "calendar-month",
                  iconType: "MaterialIcons",
                }}
                onIconPress={() => {}}
              />

             
            </View>
      
  </GrayCard>
   
  <View style={{ justifyContent: "center",marginLeft: 30, marginRight: 20 }}>
 <Button />
      </View>
    </SafeAreaView>
  );
}
export default Financement;