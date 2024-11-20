import React, { useEffect, useState } from "react";
import { InputWithTag } from "../atoms";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import { Alert, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import Dropdown from "../atoms/Dropdown";
import Button from "../atoms/form/Button";
import WhiteCard from "../atoms/form/WhiteCard";
import DatePicker from "react-native-date-picker";
import InputDate from "./InputDate";
import { useMutation } from "@tanstack/react-query";
import AddLitige from "@/services/Litige/AddLitige";
import { Litige } from "@/types/type";
import { useTranslation } from "react-i18next";
import { litigeSchema } from "@/types/schemas/LitigeSchema";

export default function LitigeForm({ formData, setFormData, setModalVisible }: {
  formData: Litige,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setFormData: React.Dispatch<React.SetStateAction<Litige>>
}) {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  const { t } = useTranslation("litige");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const schema = litigeSchema(); // Use it properly here
  const WhiteCardStyle = [
    layout.row,
    layout.flex_1,
    layout.itemsCenter,
    layout.justifyBetween,
    gutters.padding_12,
    layout.fullWidth,
    { gap: 20 },
  ];

  const options = [
    { key: t("TypeLitige1"), value: t("TypeLitige1"), label: t("TypeLitige1") },
    { key: t("TypeLitige2"), value: t("TypeLitige2"), label: t("TypeLitige2") },
    { key: t("TypeLitige3"), value: t("TypeLitige3"), label: t("TypeLitige3") },
    { key: t("TypeLitige4"), value: t("TypeLitige4"), label: t("TypeLitige4") },
  ];

  const TextStyle = [fonts.bold, fonts.size_16, fonts.gray400];

  const mutation = useMutation({
    mutationFn: () => {
      return AddLitige(formData);
    },
    onSuccess: () => {
      Alert.alert(t("success"), t("LitigeAjouteSucces"), [{
        text: t("OK"),
        onPress: () => {
          setFormData({
            ...formData,
            DateLitige: new Date(),
            DateEcheanceLitige: new Date()
          });
          setModalVisible();
        }
      }]);
    },
    onError: (error) => {
      Alert.alert(t("error"));
    },
  });

  const handleSubmit = () => {
    const result = schema.safeParse(formData); // Using the schema to validate the data

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.format().DateEcheanceLitige?._errors.forEach((err) => {
        formattedErrors.DateEcheanceLitige = err;
      });
      setErrors(formattedErrors); // Set error state with validation errors
      return;
    }

    mutation.mutate(); // Call mutation if validation passes
  };

  useEffect(() => {
    //console.log(formData);
  }, [formData]);

  return (
    <ScrollView
      style={[layout.fullWidth]}
      contentContainerStyle={[layout.fullWidth, gutters.paddingBottom_80]}
    >
      <View
        style={[
          layout.col,
          layout.justifyBetween,
          gutters.padding_12,
          backgrounds.gray100,
        ]}
      >
        <WhiteCard style={WhiteCardStyle}>
          <InputDate
            title={t("dateLitige")}
            onchange={(value) =>
              setFormData({ ...formData, DateLitige: value })
            }
            disabledAction={true}
          />
        </WhiteCard>

        <WhiteCard style={WhiteCardStyle}>
          <InputDate
            title={t("Dateecheance")}
            onchange={(value) => {
              setFormData({ ...formData, DateEcheanceLitige: value });
            }}
            errorMessage={errors.DateEcheanceLitige}
          />
        </WhiteCard>

        <WhiteCard style={[...WhiteCardStyle, layout.z10]}>
          <Text style={TextStyle}>{t("TypeLitige")}</Text>
          <View style={{ maxWidth: "50%", flex: 1 }}>
            <Dropdown
              data={options}
              setSelected={(val: string) => setFormData({ ...formData, TypeDuLitige: val })}
            />
          </View>
        </WhiteCard>

        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.fullWidth,
            gutters.padding_12,
            borders.rounded_16,
            gutters.marginVertical_12,
          ]}
        >
          <Button outlined label={t("Annuler")} onPress={() => { setModalVisible(false) }} />
          <Button label={t("Enregistrer")} onPress={handleSubmit} isLoading={mutation.isPending} />
        </View>
      </View>
    </ScrollView>
  );
}
