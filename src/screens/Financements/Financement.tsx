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
import { useMutation } from "@tanstack/react-query";
import { createFinancement } from "@/services/Financement/createFinancement";
type FinancementType = {
  MontantFinancement: number;
  DateDeFinancement: Date;
  TypeDeFinancement: string;
  MethodeDePaiement: string;
  ContratId: number;
};
function Financement(): JSX.Element {
  const storage = new MMKV();
  const { height, width } = Dimensions.get("window");
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const textStyle = [
    fonts.gray800,
    fonts.bold,
    { paddingVertical: 10 },
    { paddingHorizontal: 5 },
  ];
  const user = JSON.parse(storage?.getString("user"));
  const [open, setOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number>(1);
  const progress = useSharedValue(50000);
  const min = useSharedValue(0);
  const max = useSharedValue(500000);
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
  const { contractId } = useContract();
  const [data, setData] = useState<FinancementType>({
    MontantFinancement: 0,
    DateDeFinancement: new Date(),
    TypeDeFinancement: "",
    MethodeDePaiement: "",
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
  };

  useEffect(() => {
    console.log(data);
    console.log(storage.getString("user"));
  }, [data]);

  const mutatation = useMutation({
    mutationFn: () => {
      return createFinancement({ individuId: user.individuId, data: data });
    },
    onSuccess: (data) => {
      setModalVisible(false);
      Alert.alert("Financement creé avec_succès");
    },
  });
  return (
    <SafeAreaView style={{ flex: 1, marginVertical: 2 }}>
      <BackgroundDispoCard
        activeCard={activeCard}
        text1="Financement"
        text2="Libération"
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

      <GrayCard>
        <View
          style={[
            layout.col,
            { height: height / 10, width: width - 50, columnGap: 20 },
          ]}
        >
          <View
            style={{
              flexDirection: "row",

              justifyContent: "space-between",
            }}
          >
            <Text> 50 000 TND</Text>
            <Text>500 000 TND</Text>
          </View>
          <Slider
            onValueChange={(value) => {
              handleInputChange("MontantFinancement", value.toFixed(2) * 1);
            }}
            maximumValue={max}
            minimumValue={min}
            progress={progress}
          />
        </View>
        <View
          style={[
            backgrounds.white,
            layout.row,
            { marginHorizontal: 7.5, padding: 7.5, borderRadius: 10 },
          ]}
        >
          <InputWithTag
            title={"Montant Doc"}
            tag={{ type: "text", text: "TND" }}
            textInputPlaceholder={"0.00"}
            onChange={(val) => {
              handleInputChange("MontantFinancement", val);
            }}
            value={data.MontantFinancement}
          />
        </View>
        <View
          style={[
            layout.row,
            {
              padding: 7.5,
              borderRadius: 10,
              backgroundColor: colors.white,
              marginHorizontal: 7.5,
            },
          ]}
        >
          <Text style={textStyle}>Date du document</Text>
          <InputWithTag
            inputDisabled
            titleWidth={0}
            textInputPlaceholder={"22/02/1999"}
            onChange={() => {}}
            tag={{
              type: "icon",
              name: "calendar-month",
              iconType: "MaterialIcons",
            }}
            onIconPress={() => {
              setOpen(true);
            }}
            value={data.DateDeFinancement}
          />
        </View>
      </GrayCard>

      <View
        style={{
          justifyContent: "space-between",
          marginLeft: 30,
          marginRight: 20,
          flexDirection: "row",
        }}
      >
        <Button outlined={true} label={"Annulé"} />
        <Button label={"Suivant"} onPress={() => setModalVisible(true)} />
      </View>
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
        title={"Financements"}
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
              {" "}
              {data.DateDeFinancement.toLocaleDateString()}
            </Text>
          </View>
          {mutatation.isError && <Text>{mutatation.error.message}</Text>}
          <View style={styles.rowContainer}>
            <Button outlined={true} label="Annulé" />
            <Button
              label="confirmer"
              onPress={() => {
                mutatation.mutate();
              }}
            />
          </View>
        </GrayCard>
      </BottomModal>
    </SafeAreaView>
  );
}
export default Financement;
