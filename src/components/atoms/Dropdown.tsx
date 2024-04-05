import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useTheme } from "@/theme";
const Dropdown = ({ data }) => {
  const [selected, setSelected] = React.useState("");
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme();
  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={data}
      save="value"
      search={false}
      defaultOption={data[0]}
      boxStyles={[backgrounds.white, { height: 40, borderWidth: 0 }]}
      dropdownStyles={[
        backgrounds.white,
        { position: "absolute", top: 40, width: "100%", zIndex: 10000000000 },
      ]}
    />
  );
};
export default Dropdown;
