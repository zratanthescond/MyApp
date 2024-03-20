import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/theme';

const ProgressBar =()=> {
      const { borders, backgrounds,layout,fonts,gutters } = useTheme();
    return(
        <View style={[ layout.flex_1,{width:'100%'},gutters.padding_24, borders.rounded_16,backgrounds.white]}>
         
    <View style={[layout.row]}>
            <Text style={[]}> Facture en cours</Text>
            <Text style={[]}> 35%</Text>

        </View>
            
       
        
         </View>
    )
}
export default ProgressBar;