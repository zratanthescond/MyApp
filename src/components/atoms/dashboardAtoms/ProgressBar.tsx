import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/theme";

// Interface pour les props du composant ProgressBar
interface ProgressBarProps {
  progress: number;
  title: string;
  color: string;
  progressColor: string;
  accumulated?: number;
  part?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  title,
  color,
  progressColor,
  accumulated,
  part,
}) => {
  const { borders, backgrounds, layout, fonts, gutters } = useTheme();

  return (
    <View
      style={[
        { width: "100%", height: 100 },
        borders.rounded_16,
        backgrounds.white,
        gutters.marginBottom_16,
      ]}
    >
      <View
        style={[
          layout.row,
          layout.itemsCenter,
          layout.justifyBetween,
          gutters.padding_12,
        ]}
      >
        <Text style={[]}> {title}</Text>
        <Text style={[]}> {progress}%</Text>
      </View>
      <View
        style={[
          { width: "90%", height: 10, alignSelf: "center" },
          backgrounds[color],
          borders.rounded_4,
        ]}
      >
        <View
          style={[
            { width: `${progress}%`, height: 10, alignSelf: "start" },
            backgrounds[progressColor],
            borders.rounded_4,
          ]}
        ></View>
      </View>
      {typeof accumulated !== 'undefined' && typeof part !== 'undefined' && (
        <View
          style={[
            layout.row,
            layout.itemsCenter,
            layout.justifyBetween,
            gutters.padding_12,
          ]}
        >
          <Text style={[]}> {accumulated}DT/Mois</Text>
          <Text style={[]}> {part}DT</Text>
        </View>
      )}
    </View>
  );
};

export default ProgressBar;
