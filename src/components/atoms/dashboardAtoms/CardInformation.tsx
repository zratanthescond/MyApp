import React from "react";
import { Dimensions, Text, View } from "react-native";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";
import { ScrollView } from "react-native-gesture-handler";

const CardInformation = () => {
  const { borders, backgrounds, gutters, layout, colors } = useTheme();
  const { height, width } = Dimensions.get("window");
  return (
    <View
      style={[
        gutters.padding_12,
        backgrounds.gray100,
        layout.itemsCenter,
        borders.rounded_16,
        gutters.margin_12,
        gutters.marginBottom_32,
        layout.justifyAround,
        layout.col,
        { width: width - 24, height: height - (315 + height / 6) },
      ]}
    >
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={[
          layout.itemsCenter,
          layout.justifyBetween,
          gutters.margin_12,
          gutters.paddingBottom_16,
        ]}
      >
        <ProgressBar
          title={"Facture en cours"}
          progress={50}
          color={"purple100"}
          progressColor={"purple500"}
          part={20}
          accumulated={"268,130 "}
        />
        <ProgressBar
          title={"Fonds de garantie"}
          progress={25}
          color={"purple100"}
          progressColor={"red500"}
          part={20}
          accumulated={"1268,130 "}
        />
         <ProgressBar
          title={"Fonds de garantie"}
          progress={25}
          color={"purple100"}
          progressColor={"red500"}
          part={20}
          accumulated={"1268,130 "}
        />
         <ProgressBar
          title={"Fonds de garantie"}
          progress={25}
          color={"purple100"}
          progressColor={"red500"}
          part={20}
          accumulated={"1268,130 "}
        />
      </ScrollView>
    </View>
  );
};

export default CardInformation;
