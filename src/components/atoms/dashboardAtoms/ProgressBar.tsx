import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/theme";
import WhiteCard from "../form/WhiteCard";

// Interface pour les props du composant ProgressBar
interface ProgressBarProps {
  progress: number;
  title: string;
  color: string;
  progressColor: string;
  accumulated: number | 0;
  part: number;
}

function ProgressBar({
  progress,
  title,
  color,
  progressColor,
  accumulated,
  part,
}: ProgressBarProps): React.ReactElement {
  const { borders, backgrounds, layout, fonts, gutters } = useTheme();

  return (
    <WhiteCard
      style={[
        layout.flex_1,
        layout.col,
        layout.justifyBetween,
        layout.itemsCenter,
      ]}
    >
      <View
        style={[
          layout.flex_1,
          layout.row,
          layout.itemsCenter,
          layout.justifyBetween,
          gutters.padding_12,
          layout.fullWidth,
        ]}
      >
        <Text style={[fonts.bold, fonts.blue100]}> {title}</Text>
        <Text style={[fonts.bold, fonts.blue100]}> {progress}%</Text>
      </View>
      <View
        style={[
          layout.flex_1,
          backgrounds[color],
          borders.rounded_16,
          layout.fullWidth,

          [{ height: 10 }],
        ]}
      >
        <View
          style={[
            { width: `${progress}%`, height: 10, alignSelf: "start" },
            backgrounds[progressColor],
            borders.rounded_16,
          ]}
        />
      </View>
      {typeof accumulated !== "undefined" && typeof part !== "undefined" && (
        <View
          style={[
            layout.fullWidth,
            layout.row,
            layout.itemsCenter,
            layout.justifyBetween,
            gutters.padding_12,
          ]}
        >
          <Text style={[fonts.bold, fonts.blue100]}> {accumulated}DT/Mois</Text>
          <Text style={[fonts.bold, fonts.blue100]}> {part}DT</Text>
        </View>
      )}
    </WhiteCard>
  );
}

export default ProgressBar;
