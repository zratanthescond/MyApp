import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import{useTheme} from '@/theme'
const Dropdown = ({data}) => {

  const [selected, setSelected] = React.useState("");
  const { gutters, borders, layout, backgrounds, fonts, colors } = useTheme(); 
  return(
    <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        search={false}
        defaultOption={data[0]}
        boxStyles={[backgrounds.white,{height:'100%'}]}
        dropdownStyles={[backgrounds.white,{position:'absolute',top:'100%'}]}
    />
    
  )

};
export default Dropdown;