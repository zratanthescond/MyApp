import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/theme";
import WhiteCard from "../form/WhiteCard";
import { useTranslation } from "react-i18next";
// Interface pour les props du composant ProgressBar
interface ProgressBarProps {
  progress: number;
  title: string;
  color: string;
  progressColor: string;
  accumulated: number | 0;
  part: number;
  center?: number;
}

function ProgressBar({
  progress,
  title,
  color,
  progressColor,
  accumulated,
  part,
  center,
}: ProgressBarProps): React.ReactElement {
  const { borders, backgrounds, layout, fonts, gutters } = useTheme();
  const { t } = useTranslation(["dashboard"]);
  const [progressValue, setProgressValue] = React.useState<number>(progress);
  useEffect(() => {
    if (progress) {
      if (center > 0) {
        setProgressValue(parseFloat(progress) / 2);
      }
    }
  }, [progress, title, color, accumulated]);
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
      {center && (
        <View style={[layout.fullWidth, layout.itemsCenter]}>
          <Text style={[fonts.bold, fonts.red500, { top: -10 }]}>{center}</Text>
          <View
            style={[
              backgrounds.red500,
              { height: 25, width: 2.5, top: 11 },
              layout.z10,
              layout.absolute,
              borders.w_2,
              borders.gray800,
            ]}
          ></View>
        </View>
      )}

      <View
        style={[
          backgrounds[color],
          borders.rounded_16,
          layout.fullWidth,

          [{ height: 10, minWidth: "100%", width: "100%" }],
        ]}
      >
        <View
          style={[
            {
              width: `${progressValue}%`,
              height: 10,
              alignSelf: "start",
              minWidth: `${progressValue}%`,
            },
            backgrounds[progressColor],
            borders.rounded_16,
            layout.flex_16,
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
          <Text style={[fonts.bold, fonts.blue100]}> {accumulated} Tnd</Text>
          <Text style={[fonts.bold, fonts.blue100]}>
            {part == "&#8734;" ? convertSymbolsFromCode(part) : part} Tnd
          </Text>
        </View>
      )}
    </WhiteCard>
  );
}

export default ProgressBar;
export function convertSymbolsFromCode(name = "") {
  let final = null;
  if (name) {
    const val = name.match(/&#\d+;/) ? name.match(/&#\d+;/)[0] : false; // need to check whether it is an actual symbol code
    if (val) {
      const num = val.match(/\d+;/) ? val.match(/\d+;/)[0] : false; // if symbol, then get numeric code
      if (num) {
        final = num.replace(/;/g, "");
      }
    }
    if (final) {
      name = name.replace(/&#\d+;/g, String.fromCharCode(final));
    }
  }
  return name;
}
