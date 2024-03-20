import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/theme';

const ProgressBar =()=> {
      const { borders, backgrounds,layout,fonts } = useTheme();
    return(
        <View style={[]}>
             <View style={[{width:'100%'},backgrounds.white]}>
           <Text style={[]}> </Text>

    <View style={[layout.row]}>
            <Text style={[]}> Facture en cours</Text>
            <Text style={[]}> 35%</Text>

        </View>
             </View>
       
        
         </View>
    )
}
export default ProgressBar;