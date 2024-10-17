import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Alert, Text } from "react-native";
import useTheme from "@/theme/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import { InputWithTag, YearPicker } from "@/components/atoms";

import Button from "@/components/atoms/form/Button";
import DatePicker from "react-native-date-picker";
import useContract from "@/contexts/auth/useContract";
import { FormulaireData } from "@/types/bordereaux";
import { BordereauSchema } from "@/types/schemas/Bordereau"
import { useTranslation } from "react-i18next";

function Form(): JSX.Element {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { height, width } = Dimensions.get("window");

  const navigate = useNavigation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { borders, layout, backgrounds } = useTheme();
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



  const handleInputChange = (field: keyof FormulaireData, value: string | number | Date) => {
    setData({
      ...data,
      [field]: value,
    });
    setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
  };
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(data);
    console.log(data.Factures.length);
  }, [data]);

  const { t } = useTranslation(["bordereau"]);

  const hundleSuivant = () => {
    const result = BordereauSchema.safeParse(data);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        MontantTotal: formattedErrors.MontantTotal?._errors[0],
        DateBordereau: formattedErrors.DateBordereau?._errors[0],
        NombreDocuments: formattedErrors.NombreDocuments?._errors[0],
        AnneeBordereau: formattedErrors.AnneeBordereau?._errors[0],
      });
      return;
    }
    /* const dataToSend = {
       ...data,
       DateBordereau: data.DateBordereau.toISOString(), // Assurez-vous que cela soit bien un objet Date
     }*/

    navigate.navigate("BordureauDetails", { data, setData });
  };

  useEffect(() => {
    handleInputChange("AnneeBordereau", selectedYear)
  }, [selectedYear]);
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
        <WhiteCard style={[layout.col]} height={height / 8} >
          <InputWithTag
            title={t("bordereau:MontantTotal")}
            type="numeric"
            tag={{ type: "text", text: "TND" }}
            titleWidth={width / 3.5}
            textInputPlaceholder="Montant"
            onChange={(text: number) => handleInputChange("MontantTotal", parseFloat(text) || 0)}
            value={data.MontantTotal}

            errorMessage={errors.MontantTotal}
          />

        </WhiteCard>


        <WhiteCard style={[layout.col]} height={height / 8} >
          <InputWithTag
            title={t("bordereau:Année")}
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
            errorMessage={errors.AnneeBordereau}
          />

        </WhiteCard>
        <WhiteCard style={[layout.col]} height={height / 8} >
          <InputWithTag
            title={t("bordereau:Date")}
            tag={{
              type: "icon",
              name: "calendar-month",
              iconType: "MaterialIcons",
            }}
            titleWidth={width / 4}
            onChange={(date) => {
              handleInputChange("DateBordereau", date as Date);
              // Alert.alert(date.toDateString())
            }}
            textInputPlaceholder={date.toLocaleDateString("en-US")}
            onIconPress={() => setOpen(true)}
            inputDisabled
            value={date.toLocaleDateString("en-US")}
            errorMessage={errors.DateBordereau}
          />


        </WhiteCard>
        <WhiteCard style={[layout.col]} height={height / 8} >
          <InputWithTag
            title={t("bordereau:NBDocs")}
            type="numeric"
            titleWidth={width / 2}
            onChange={(text) => handleInputChange("NombreDocuments", parseInt(text))}
            textInputPlaceholder={t("bordereau:Nombredoc")}
            errorMessage={errors.NombreDocuments}
          />

        </WhiteCard>
      </View>
      <Button
        label={t("bordereau:Suivant")}
        onPress={() => { hundleSuivant() }}
        outlined
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
          handleInputChange("DateBordereau", date as Date);
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
