import React from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import Form from "../Bordureau/form";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import Button from "@/components/atoms/form/Button";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function BordureauDetails() {
    const { height, width } = Dimensions.get("window");
     const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
     const [selected, setSelected] = React.useState("");
       const data = [
      {key:'1', value:'Traite'},
      {key:'2', value:'Virement'},
      {key:'3', value:'Chaque'},,
    
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
       <View style={[layout.row,{ marginVertical: 2 }]}>
         <View style={[layout.col,{ marginVertical: 2}]}>
         <SelectList 

      setSelected={setSelected} 
      fontFamily='lato'
      data={data}  
     // arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
      defaultOption={{ key:'1', value:'Traite' }}   
    />
          
         </View>
  
       </View>
    </GrayCard>
    </View>
     <View style={{ alignSelf:'center',height:height/10}}>
      <Button />
    </View>
    </SafeAreaView>
  );
}
