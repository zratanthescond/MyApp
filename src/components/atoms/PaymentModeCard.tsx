import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/theme";
import { useTranslation } from "react-i18next";

type PaymentOption = string;

function PaymentModeCard({ getPaymentMode }: { getPaymentMode: (mode: PaymentOption) => void }): JSX.Element {
  const { height, width } = Dimensions.get("window");
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  const { t } = useTranslation(["financement"]);


  const options: PaymentOption[] = [
    t("financement:Paiement1"),
    t("financement:Paiement2"),
    t("financement:Paiement3")
  ];

  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(options[0]);

  const handleOptionSelect = (option: PaymentOption) => {
    setSelectedOption(option);
    getPaymentMode(option);
  };

  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: selectedOption === option ? colors.blue100 : colors.blue50,
            },
          ]}
          onPress={() => handleOptionSelect(option)}
        >
          <Text style={[selectedOption === option && styles.selectedText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}

export default PaymentModeCard;

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    padding: 20,
    flexGrow: 0,
  },
  card: {
    width: 120,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  selectedText: {
    color: "white",
  },
});
