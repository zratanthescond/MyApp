import React from "react";
import { Dimensions, Text, View } from "react-native";
import { useTheme } from '@/theme';
import ProgressBar from '@/components/atoms/dashboardAtoms/ProgressBar';

const CardInformation = () => {

    const { borders, backgrounds, gutters, layout, colors } = useTheme();
    const { height, width } = Dimensions.get('window');
    return (
        <View
            style={[backgrounds.gray100, layout.itemsCenter, borders.rounded_16, gutters.margin_12, 
            layout.justifyAround, layout.col, { width: width -24, height: height -( 315 + (height/6)) }]}>
         <ProgressBar/>
        </View>



    )

}

export default CardInformation;