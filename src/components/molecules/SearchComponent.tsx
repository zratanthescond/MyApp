import React, { useState, useEffect } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import AppIcon from "../icons/AppIcons";
import InputWithTag from "../atoms/form/InputWithTag";
import { useTheme } from "@/theme";
import { json } from "stream/consumers";


const SearchComponent = ({ data, setfiltredData, field, Objectkey = "" }: { data: any, setfiltredData: any, field: string, Objectkey: string }) => {
    const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
    const [searchKey, setSearchKey] = useState<string>("");
    useEffect(() => {
        if (data && data.$values && data.$values.length > 0) {

            if (searchKey.length > 0) {
                const newData = data.$values.filter((item) => {

                    if (Objectkey !== "") {


                        return item[Objectkey][field].toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
                    }

                    return item[field].toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())



                }
                )
                setfiltredData({ ...data, $values: newData })
            }
            else {
                setfiltredData(data)
            }
        }
    }, [searchKey, data]);
    return (


        <>
            <InputWithTag
                onChange={(value: string) => setSearchKey(value)}
                titleWidth={0}

                textInputPlaceholder="Search"
                tag={{
                    iconColor: colors.white,
                    type: "icon",
                    name: "filter",
                    iconType: "AntDesign",
                    backgroundColor: colors.purple500,
                }}
            />

        </ >
    )
}
export default SearchComponent