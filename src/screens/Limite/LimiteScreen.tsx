import React, { useEffect } from "react";
import { SafeScreen } from "@/components/template";
import { Alert, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme";
import PaymentModeCard from "@/components/atoms/PaymentModeCard";
import { InputWithTag } from "@/components/atoms";

import Button from "@/components/atoms/form/Button";
import InputDate from "@/components/molecules/InputDate";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import { Limit } from "@/types/type";
import AddLimit from "@/services/Limit/AddLimit";
import { useMutation } from "@tanstack/react-query";
import useContract from "@/contexts/auth/useContract";
import { useTranslation } from "react-i18next";

export default function LimiteScreen() {
  const { layout, backgrounds, gutters, borders, fonts, colors } = useTheme();
  const textStyle = [
    fonts.bold,
    fonts.size_16,
    fonts.gray800,
    gutters.marginBottom_24,
  ];
  const { contractId } = useContract();
  const currentDate = new Date();
  const { t } = useTranslation("limite");

  const [formData, setFormData] = React.useState<Limit>({
    dateDerniereDemande: currentDate,
    contratId: contractId,
    dateDemande: currentDate,
    dateLimite: currentDate,
    delaiDemande: 0,
    modePaiement: "Check",
  });

  const mutation = useMutation({
    mutationKey: ["acheteurs"],
    mutationFn: () => AddLimit(formData),
    onSuccess: () => {
      Alert.alert(t("success"), t("ProrogationAjouteSucces"), [{
        text: t("OK"),
        onPress: () => setFormData({
          ...formData,
          dateDemande: new Date(),
          dateLimite: new Date(),
          dateDerniereDemande: new Date(),
        })
      }]);
    },
    onError: () => {
      Alert.alert(t("error"));
    },
  });

  useEffect(() => {
    //console.log(formData);
  }, [formData]);

  return (
    <SafeScreen>
      <View style={[
        layout.fullWidth,
        layout.fullHeight,
        backgrounds.white,
        gutters.padding_12,
        layout.flex_1,
      ]}
      >
        <Text style={textStyle}>{t("Titre")}</Text>
        <PaymentModeCard getPaymentMode={(mode) => setFormData({ ...formData, modePaiement: mode })} />

        <ScrollView style={layout.flex_1} contentContainerStyle={gutters.paddingBottom_32}>
          <View style={[
            backgrounds.gray100,
            borders.rounded_16,
            gutters.padding_12,
            layout.flex_1,
            layout.justifyAround,
            layout.itemsStart,
            gutters.marginVertical_24,
          ]}
          >
            <WhiteCard flex="col" style={layout.fullWidth}>
              <InputDate
                title={t("dateDemande")}
                onchange={(value) => setFormData({ ...formData, dateDemande: value })}
              />
            </WhiteCard>

            <WhiteCard style={layout.fullWidth}>
              <InputDate
                title={t("dateLimite")}
                onchange={(value) => setFormData({ ...formData, dateLimite: value })}
              />
            </WhiteCard>

            <WhiteCard style={layout.fullWidth}>
              <InputDate
                title={t("dateDerniereDemande")}
                onchange={(value) => setFormData({ ...formData, dateDerniereDemande: value })}
              />
            </WhiteCard>
          </View>

          <View style={[
            layout.justifyBetween,
            backgrounds.gray100,
            borders.rounded_16,
            gutters.padding_12,
            layout.flex_1,
            gutters.marginVertical_12,
          ]}
          >
            <View style={[
              layout.row,
              layout.flex_1,
              layout.fullWidth,
              gutters.marginVertical_12,
              borders.rounded_16,
            ]}
            >
              <InputWithTag
                onChange={(val: number) => setFormData({ ...formData, delaiDemande: val })}
                textInputPlaceholder={t("holderDelai")}
                type="numeric"
                titleWidth={0}
                tag={{ type: "text", text: t("delaiDemande") }}
                value={formData.delaiDemande === 0 ? "" : formData.delaiDemande}
              />
            </View>
          </View>

          <View style={[layout.row, layout.justifyBetween, layout.fullWidth]}>
            <Button label={t("Annuler")} outlined onPress={() => setFormData({
              ...formData,
              dateDemande: new Date(),
              dateLimite: new Date(),
              dateDerniereDemande: new Date(),
              delaiDemande: 0,
              limiteAssurance: 0,
              limiteFinancement: 0,
              modePaiement: ""
            })} />
            <Button label={t("Enregistrer")} onPress={() => mutation.mutate()} isLoading={mutation.isPending} />
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
