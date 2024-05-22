import React, { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme";
import LinearGradient from "react-native-linear-gradient";

type PaymentOption = 'Chèque' | 'Virement' | 'Espèce';

const PaymentModeCard = () => {
    const { height, width } = Dimensions.get("window");
    const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();

   
    const options: PaymentOption[] = ['Chèque', 'Virement', 'Espèce'];
    const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(null);

    const handleOptionSelect = (option: PaymentOption) => {
        setSelectedOption(option);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
              
            <ScrollView horizontal={true} style={styles.scrollView}>
                {options.map((option, index) => (
             
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.card,
                            { 
                                backgroundColor: selectedOption === option ? colors.blue100 : colors.blue50
                            }
                        ]}
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text style={[selectedOption === option && styles.selectedText]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                    
                ))}
            </ScrollView>
          
        </SafeAreaView>
    );
}

export default PaymentModeCard;

const styles = StyleSheet.create({
    scrollView: {
        flexDirection: 'row',
        padding: 20,
    },
    card: {
        width: 120,
        height: 50,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    selectedText: {
        color: 'white', // Couleur de texte différente pour l'option sélectionnée
    },
});
