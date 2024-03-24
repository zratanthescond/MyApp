import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Text, Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-neat-date-picker';
import useTheme from "@/theme/hooks/useTheme";
interface FormulaireData {
  montant: number;
  
}

const Formulaire: React.FC = () => {
     const { gutters, borders, layout,backgrounds ,fonts} = useTheme();
     const { height, width } = Dimensions.get("window");
  const [data, setData] = useState<FormulaireData>({
    montant: 0
  });

  const handleChangeMontant = (montant: string) => {
    setData({ ...data, montant: parseFloat(montant) });
  };

    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
  const [showDatePickerRange, setShowDatePickerRange] = useState(false);

  const [date, setDate] = useState('');

  const openDatePickerSingle = () => setShowDatePickerSingle(true)
  const openDatePickerRange = () => setShowDatePickerRange(true)

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false)
  }

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false)
    console.log(output)
    setDate(output.dateString)
  }


  return (
   <View style={[ layout.flex_1]}>
    
    <View style={[
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.white ,
        {borderRadius: 10,  marginTop:30,height:50, marginBottom:30}]}>
      
    </View>
      
    <View style={[
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.white ,
      
        {borderRadius: 10,  height:50, marginBottom:30}]}>

    </View>
      
    <View style={[
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.white ,
      
        {borderRadius: 10,  height:50, marginBottom:30}]}>

    </View>
      
    <View style={[
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.white ,
      
        {borderRadius: 10,  height:50, marginBottom:30}]}>

    </View>
      
      <View style={styles.datePickerContainer}>

      <Button title={'single'} onPress={openDatePickerSingle} />
      <DatePicker
        isVisible={showDatePickerSingle}
        mode={'single'}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
      />
      <Text>{date}</Text>

   
    </View>
  </View>

  );
};

const styles = StyleSheet.create({
 
 datePickerContainer: {
    width: 300, // Adjust width as needed
    height: 50, // Adjust height as needed
    backgroundColor: 'white', // Or any desired background color
    borderRadius: 10,
 }
});

export default Formulaire;
