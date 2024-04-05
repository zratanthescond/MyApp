import React, { useEffect, useState } from "react";
import { View,StyleSheet,Dimensions} 
from "react-native";
import useTheme from "@/theme/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import { InputWithTag } from "@/components/atoms";
import { YearPicker } from "@/components/atoms";
import Button from "@/components/atoms/form/Button";
interface FormulaireData {
  montant: number;
}

const Form: React.FC = () => {
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const { height, width } = Dimensions.get("window");
  const [data, setData] = useState<FormulaireData>({
    montant: 0,
  });

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const handleChangeMontant = (montant: string) => {
    setData({ ...data, montant: parseFloat(montant) });
  };
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
  }, [modalVisible]);

  return (
    <>
      <View
        style={[
          layout.flex_1,
          backgrounds.gray50,
          borders.rounded_16,
          layout.col,
          layout.itemsCenter,
          layout.justifyAround,
          { padding: 15 },
        ]}
      >
        <WhiteCard height={height / 10}>
          <InputWithTag
            title={"Montant Total"}
            tag={{ type: "text", text: "TND" }}
            titleWidth={width / 3.5}
            textInputPlaceholder={"Montant"}
            onChange={() => handleChangeMontant}
          />
        </WhiteCard>
        <WhiteCard height={height / 10}>
          <InputWithTag
            title={"Année"}
            tag={{
              type: "icon",
              name: "calendar-month",
              iconType: "MaterialIcons",
            }}
            titleWidth={width / 3.5}
            onChange={() => setModalVisible(true)}
            textInputPlaceholder={selectedYear.toString()}
            onIconPress={() => setModalVisible(true)}
            inputDisabled={true}
            value={selectedYear}
          />
        </WhiteCard>
        <WhiteCard height={height / 10}>
          <InputWithTag
            title={"Date Du Bordureau"}
            tag={{
              type: "icon",
              name: "calendar-month",
              iconType: "MaterialIcons",
            }}
            titleWidth={width / 2}
            onChange={() => handleChangeMontant}
            textInputPlaceholder={"jj/mm/yyyy"}
          />
        </WhiteCard>
        <WhiteCard height={height / 10}>
          <InputWithTag
            title={"N° de document"}
            titleWidth={width / 2}
            onChange={() => handleChangeMontant}
            textInputPlaceholder={"nombre des fois"}
          />
        </WhiteCard>
      </View>
      <Button/>
        
      <YearPicker
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 120,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
  },

  outlineButton: {
    backgroundColor: "white",
    borderColor: "#013467",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    width: 150,
    marginRight: 30,
  },
  ValideButton: {
    backgroundColor: "#013467",
    borderColor: "#013467",

    borderRadius: 5,
    padding: 12,
    width: 150,
  },
  TextAnnuler: {
    color: "#013467",
    fontSize: 16,
    alignSelf: "center",
  },
  TextSuivant: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
  },
});

export default Form;
