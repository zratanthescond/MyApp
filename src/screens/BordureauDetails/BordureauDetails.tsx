import React from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import Form from "../Bordureau/form";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import Button from "@/components/atoms/form/Button";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";

import Dropdown from "@/components/atoms/Dropdown";
export default function BordureauDetails() {
    const { height, width } = Dimensions.get("window");
     const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
    const dataReglement = [
      {key:'1', value:'Traite'},
      {key:'2', value:'Chèque'},
      {key:'3', value:'Virement'},
     
  ]
  
  const dataDocument = [
      {key:'1', value:'Facture'},
      {key:'2', value:'B.Commande'},
      {key:'3', value:'Marche'},
     
  ]
 
  return (
    <SafeAreaView style={{ flex: 1 ,marginVertical: 2}}>
  <View style={{ justifyContent: 'center',marginLeft:20,marginRight:20}}>
     
   <ProgressBar
          title={"Simulation Pour Compléter"}
          progress={50}
          color={"purple100"}
          progressColor={"purple500"}
        
          
        />
   
    </View>
      <View style={{ justifyContent: 'center' ,marginVertical: 2}}>
    <GrayCard height={height/2}  >
       <View style={{height:'15%',flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
        
        <Dropdown
         data={dataReglement}
         />
          
      <Dropdown
         data={dataDocument}
         />
        
        </View>
          
  
     
    </GrayCard>
    </View>
     <View style={{ alignSelf:'center',height:height/10}}>
      <Button />
    </View>
    </SafeAreaView>
  );
}
