import React, { useEffect, useState } from "react";
import { InputWithTag } from "../atoms";
import GrayCard from "../atoms/dashboardAtoms/GrayCard";
import { Alert, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import Dropdown from "../atoms/Dropdown";
import Button from "../atoms/form/Button";
import WhiteCard from "../atoms/form/WhiteCard";
import InputDate from "./InputDate";
import { Prorogation } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import AddProrogation from "@/services/Prorogation/prorogation";
import { useTranslation } from "react-i18next";

export default function ProrogationForm({ formData, setFormData, setModalVisible }: {
  formData: Prorogation;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<Prorogation>>
}) {
  const { fonts, colors, layout, backgrounds, gutters, borders, variant } = useTheme();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    //console.log(formData)
  }, [formData]);

  const mutation = useMutation({
    mutationFn: () => {
      return AddProrogation(formData);
    },
    onSuccess: () => {
      Alert.alert(t("success"), t("ProrogationAjouteSucces"), [{
        text: t("OK"),
        onPress: () => {
          setFormData({
            ...formData,

            DateEcheanceApresProrogation: new Date(),
            MotifProrogation: '',
          });
          setModalVisible(false);
        }
      }]);
    },
    onError: (error) => {
      //console.log(error);
      Alert.alert(t("error"));
    },
  });
  const { t } = useTranslation("prorogation");

  return (
    <ScrollView
      style={[layout.fullWidth]}
      contentContainerStyle={[layout.fullWidth, gutters.paddingBottom_80]}
    >
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.justifyAround,
          gutters.padding_12,
          backgrounds.gray100,
        ]}
      >
        <WhiteCard style={[layout.flex_1, layout.fullWidth, gutters.padding_12]}>
          <InputDate
            title={t("dateEcheance")}
            value={formData.Echeance}
            onchange={(value: Date) => { setFormData({ ...formData, Echeance: value }) }}
            disabledAction={true}

          />
        </WhiteCard>
        <WhiteCard style={[layout.flex_1, layout.fullWidth, gutters.padding_12]}>
          <InputWithTag
            onChange={(value: string) => { setFormData({ ...formData, MotifProrogation: value }) }}
            style={[gutters.padding_12]}
            title={t("motif")}
            textInputPlaceholder={t("holderMotif")}
          />
        </WhiteCard>
        <WhiteCard style={[layout.flex_1, layout.fullWidth, gutters.padding_12]}>
          <InputDate
            title={t("DateApresEcheance")}
            onchange={(value: Date) => { setFormData({ ...formData, DateEcheanceApresProrogation: value }) }}
          />
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
          <Button outlined={true} label={t("Annuler")} onPress={() => { setModalVisible(false) }} />
          <Button label={t("Enregistrer")} onPress={() => { mutation.mutate() }} />
        </View>
      </View>
    </ScrollView>
  );
}
