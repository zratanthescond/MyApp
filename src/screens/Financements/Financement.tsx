import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useTheme } from "@/theme";
import BackgroundDispoCard from "@/components/molecules/BackgroundDispoCard";
import PaymentModeCard from "@/components/atoms/PaymentModeCard";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import { InputWithTag } from "@/components/atoms";
import Button from "@/components/atoms/form/Button";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { use } from "i18next";
import BottomModal from "@/components/molecules/BottomModal";
import useContract from "@/contexts/auth/useContract";
import DatePicker from "react-native-date-picker";
import { MMKV } from "react-native-mmkv";
import { Mutation, useMutation } from "@tanstack/react-query";
import { createFinancement } from "@/services/Financement/createFinancement";
import FinancementSchema from "@/types/schemas/FinancementSchema";
import { z } from "zod";
import { useTranslation } from "react-i18next";
type FinancementType = {
  MontantFinancement: number;
  DateDeFinancement: Date;
  TypeDeFinancement: string;
  MethodeDePaiement: string;
  ContratId: number;
};
function Financement(): JSX.Element {
  const financementSchema = FinancementSchema();
  const { contractId, contractMontant } = useContract();
  const storage = new MMKV();
  const { height, width } = Dimensions.get("window");
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const textStyle = [
    fonts.gray800,
    fonts.bold,
    { paddingVertical: 10 },
    { paddingHorizontal: 5 },
  ];
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const user = JSON.parse(storage?.getString("user"));
  const [open, setOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number>(1);
  const progress = useSharedValue(contractMontant / 10);
  const min = useSharedValue(contractMontant / 10);
  const max = useSharedValue(contractMontant);
  const [modalVisible, setModalVisible] = useState(false);
  const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    boldText: [fonts.bold, fonts.gray800],
    smallText: [fonts.size_12, fonts.gray400],
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [data, setData] = useState<FinancementType>({
    MontantFinancement: 0,
    DateDeFinancement: new Date(),
    TypeDeFinancement: "Financement",
    MethodeDePaiement: "Chèque",
    ContratId: contractId,
  });
  const handleInputChange = (
    field: keyof FinancementType,
    value: string | number | Date
  ) => {
    setData({
      ...data,
      [field]: value,
    });
    setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
  };

  useEffect(() => {
    //console.log(data);
    //console.log(storage.getString("user"));
  }, [data]);

  const { t } = useTranslation(["financement"]);
  const mutatation = useMutation({
    mutationFn: () => {
      return createFinancement({ individuId: user.individuId, data: data });
    },
    onSuccess: () => {
      setModalVisible(false);
      Alert.alert("success", "Financement creé avec_succès", [{
        text: "OK",
        onPress: () => setData({ ...data, MontantFinancement: 0, DateDeFinancement: new Date() })
      }]);
    },
  });
  const hundleSuivant = () => {

    const result = financementSchema.safeParse(data);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        MontantFinancement: formattedErrors.MontantFinancement?._errors[0],
        DateDeFinancement: formattedErrors.DateDeFinancement?._errors[0],

      });
      return;
    }
    setModalVisible(true)

  };



  return (
    <SafeAreaView style={{ flex: 1, marginVertical: 2 }}>

      <ScrollView contentContainerStyle={[layout.flex_1, gutters.paddingBottom_40]} >

        <BackgroundDispoCard
          activeCard={activeCard}
          text1={t("financement:Type1")}
          text2={t("financement:Type2")}
          setActiveCard={(val: number) => {
            setActiveCard(val);
            const type = val === 1 ? "Financement" : "LiberationFDG";
            handleInputChange("TypeDeFinancement", type);
          }}
        />

        <PaymentModeCard
          getPaymentMode={(mode: string) => {
            handleInputChange("MethodeDePaiement", mode);
          }}
        />

        <GrayCard style={[layout.col, layout.fullHeight, layout.flex_1]}>
          {/*  <View
            style={[
              backgrounds.white,
              gutters.margin_12,
              borders.rounded_16,
              layout.col,
              layout.flex_1,
              layout.justifyBetween,

              gutters.padding_12,
            ]}
          >
            <View
              style={[
                layout.fullWidth,
                layout.row,
                layout.justifyBetween,
                gutters.padding_12,
              ]}
            >
              <Text style={[fonts.purple500, fonts.bold, fonts.size_16]}> {contractMontant / 10} TND</Text>
              <Text style={[fonts.red500, fonts.bold, fonts.size_16]}>{contractMontant} TND</Text>
            </View>
             <View style={[layout.flex_1, gutters.padding_12]}>
              <Slider
                onValueChange={(value) => {
                  progress.value = value;
                  handleInputChange("MontantFinancement", value);
                }}
                maximumValue={max}
                minimumValue={min}
                progress={progress}

              />
            </View>  
          </View> */}
          <View
            style={[
              layout.row,
              layout.flex_1,
              backgrounds.white,
              gutters.padding_12,
              gutters.margin_12,
              borders.rounded_16,
            ]}
          >


            <InputWithTag
              titleWidth={100}
              title={t("financement:Montant")}
              tag={{ type: "text", text: "TND" }}

              type="numeric"
              onChange={(val: string) => {
                handleInputChange("MontantFinancement", parseFloat(val) >= contractMontant ? contractMontant : parseFloat(val) || 0);
              }}
              value={data.MontantFinancement === 0 ? "" : data.MontantFinancement}
              errorMessage={errors.MontantFinancement}

            />
          </View>
          <Text style={[fonts.red500, fonts.bold, fonts.size_12]}> Ne dépasser pas le montant disponible : {contractMontant} TND</Text>

          <View
            style={[
              layout.itemsCenter,
              layout.row,
              layout.flex_1,
              backgrounds.white,
              gutters.padding_12,
              gutters.margin_12,
              borders.rounded_16,
            ]}
          >
            <Text style={textStyle}>{t("financement:Date")}</Text>
            <InputWithTag
              inputDisabled
              titleWidth={0}
              onChange={() => { }}
              tag={{
                type: "icon",
                name: "calendar-month",
                iconType: "MaterialIcons",
              }}
              onIconPress={() => {
                setOpen(true);
              }}
              value={formatDate(data.DateDeFinancement)}
              errorMessage={errors.DateDeFinancement}
            />
          </View>
          <View style={[layout.row, layout.justifyBetween]}>
            <Button outlined label={t("financement:Annuler")} onPress={() => {
              setData({
                ...data, MontantFinancement: 0, DateDeFinancement: new Date()
              })
            }} />
            <Button

              label={t("financement:Suivant")}
              onPress={() => hundleSuivant()}
            />
          </View>
        </GrayCard>

        <DatePicker
          mode="date"
          date={data.DateDeFinancement}
          modal
          open={open}
          onConfirm={(date) => {
            setOpen(false);
            handleInputChange("DateDeFinancement", date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <BottomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title="Financements"
        >
          <GrayCard>
            <View style={styles.rowContainer}>
              <Text style={styles.boldText}>Adhérant</Text>
              <Text style={styles.smallText}>
                {user.nom} {user.prenom}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.boldText}>Type de Financement</Text>
              <Text style={styles.smallText}> {data.TypeDeFinancement}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.boldText}>Type de Paiement</Text>
              <Text style={styles.smallText}> {data.MethodeDePaiement}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.boldText}>Montant demandé</Text>
              <Text style={styles.smallText}> {data.MontantFinancement}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.boldText}>Date de demande</Text>
              <Text style={styles.smallText}>
                {formatDate(data.DateDeFinancement)}
              </Text>
            </View>
            {mutatation.isError && <Text>{mutatation.error.message}</Text>}
            <View style={styles.rowContainer}>
              <Button outlined={true} label="Annuler" onPress={() => { setModalVisible(false) }} />
              <Button
                isLoading={mutatation.isPending}
                label="confirmer"
                onPress={() => mutatation.mutate()
                }
              />
            </View>
          </GrayCard>
        </BottomModal>
      </ScrollView>
    </SafeAreaView>
  );
}
export default Financement;
