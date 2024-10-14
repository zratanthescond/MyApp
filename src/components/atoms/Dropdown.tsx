import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useTheme } from "@/theme";
import layout from "@/theme/layout";
import { View } from "react-native";

type Option = {
  key: string;
  value: string;
};
type Props = {
  data: Option[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};
function Dropdown({ data, setSelected, ...props }: Props) {
  const { backgrounds, colors } = useTheme();
  return (
    <View
      style={[layout.flex_1, layout.fullWidth, layout.z10, { elevation: 20 }]}
    >
      <SelectList
        setSelected={(val: string) => {
          setSelected(val);
        }}
        data={data}
        save={props.save || "value"}
        search={false}
        defaultOption={data[0]}
        boxStyles={[
          backgrounds.white,

          {
            //  width: "100%",
            borderWidth: 0,
            elevation: 20,
            shadowColor: colors.gray400,
            borderBottomColor: colors.gray100,
          },
        ]}
        dropdownStyles={[
          backgrounds.white,
          {
            position: "absolute",
            top: 40,
            width: "100%",
            zIndex: 1000,
            borderWidth: 0,
            elevation: 20,
          },
        ]}
      />
    </View>
  );
}
export default Dropdown;
