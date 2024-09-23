import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import useTheme from "@/theme/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import { InputWithTag, YearPicker } from "@/components/atoms";

import Button from "@/components/atoms/form/Button";
import DatePicker from "react-native-date-picker";
import useContract from "@/contexts/auth/useContract";
import { FormulaireData } from "@/types/bordereaux";

function Form(): JSX.Element {
  const navigate = useNavigation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { borders, layout, backgrounds } = useTheme();
  const { height, width } = Dimensions.get("window");
  const { contractId } = useContract();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<FormulaireData>({
    MontantTotal: 0,
    DateBordereau: date,
    NombreDocuments: 0,
    AnneeBordereau: selectedYear,
    ContratId: contractId,
    Factures: [],
  });

  const handleInputChange = (field: keyof FormulaireData, value: string) => {
    setData({
      ...data,
      [field]: value,
    });
  };
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(data);
    console.log(data.Factures.length);
  }, [data]);

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
            title="Montant Total"
            tag={{ type: "text", text: "TND" }}
            titleWidth={width / 3.5}
            textInputPlaceholder="Montant"
            onChange={(text: number) => handleInputChange("MontantTotal", text)}
            value={data.MontantTotal}
          />
        </WhiteCard>
        <WhiteCard height={height / 10}>
          <InputWithTag
            title="Année"
            tag={{
              type: "icon",
              name: "calendar-month",
              iconType: "MaterialIcons",
            }}
            titleWidth={width / 3.5}
            onChange={() => setModalVisible(true)}
            textInputPlaceholder={selectedYear.toString()}
            onIconPress={() => setModalVisible(true)}
            inputDisabled
            value={selectedYear}
          />
        </WhiteCard>
        <WhiteCard height={height / 10}>
          <InputWithTag
            title="Date Du Bordureau"
            tag={{
              type: "icon",
              name: "calendar-month",
              iconType: "MaterialIcons",
            }}
            titleWidth={width / 2}
            onChange={() => {
              handleInputChange("DateBordereau", date as Date);
            }}
            textInputPlaceholder={date.toLocaleString()}
            onIconPress={() => setOpen(true)}
          />
        </WhiteCard>
        <WhiteCard height={height / 10}>
          <InputWithTag
            title="N° de document"
            titleWidth={width / 2}
            onChange={(text) => handleInputChange("NombreDocuments", text)}
            textInputPlaceholder="nombre des fois"
          />
        </WhiteCard>
      </View>
      <Button
        label="Suivant"
        onPress={() => navigate.navigate("BordureauDetails", { data, setData })}
        outlined={undefined}
      />

      <YearPicker
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <DatePicker
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

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
