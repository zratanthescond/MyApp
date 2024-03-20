import React from "react";
import { Dimensions, Text, View } from "react-native";
import { useTheme } from '@/theme';
import ProgressBar from '@/components/atoms/dashboardAtoms/ProgressBar';
import { ScrollView } from "react-native-gesture-handler";

const CardInformation = () => {

    const { borders, backgrounds, gutters, layout, colors } = useTheme();
    const { height, width } = Dimensions.get('window');
    return (
        <View
            style={[gutters.padding_12,backgrounds.gray100, layout.itemsCenter, borders.rounded_16, gutters.margin_12, 
            layout.justifyAround, layout.col, { width: width -24, height: height -( 315 + (height/6)) }]}>
         <ScrollView style={{width:'100%'}} contentContainerStyle={[gutters.padding_12, gutters.margin_12,{flexGrow:1,paddingVertical:30}]}>
         <ProgressBar/>
         <ProgressBar/>
         <ProgressBar/>
         <ProgressBar/>
         </ScrollView>
        </View>



    )

}

export default CardInformation;