import { View, Dimensions, Text, Modal, TouchableOpacity } from "react-native";
import { useTheme } from "@/theme";
import AppIcon from "@/components/icons/AppIcons";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("window");

export default function YearPicker({
  selectedYear,
  setSelectedYear,
  modalVisible,
  setModalVisible,
}) {
  const { backgrounds, colors } = useTheme();
  const componentHeight = height / 2;
  const numbers = [];
  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => {
    yearsElemets();
    console.log(years);
    setYears(numbers);
  }, [currentYear]);
  const yearsElemets = () => {
    for (let i = currentYear - 11; i <= currentYear; i++) {
      numbers.push(i);
    }
  };
  const backDropStyle = [
    {
      position: "absolute",
      height: height,
      width: width,
      zIndex: 99,
      backgroundColor: colors.gray400,
      opacity: 0.6,
      flex: 1,
    },
  ];

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={backDropStyle}></View>
      <View
        style={{
          position: "absolute",
          zIndex: 100,
          bottom: height / 2 - componentHeight / 2,
          width: width - 20,
          backgroundColor: colors.white,
          opacity: 1,
          height: height / 3,
          borderRadius: 20,
          padding: 20,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            height: "15%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => setCurrentYear(parseInt(currentYear - 11))}
          >
            <AppIcon name="left" size={14} type="AntDesign" />
          </TouchableOpacity>

          <Text
            style={{ fontSize: 18, fontWeight: "500", color: colors.gray800 }}
          >
            {parseInt(currentYear) - 11} - {currentYear}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentYear(parseInt(currentYear + 11))}
          >
            <AppIcon name="right" type="AntDesign" size={14} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: 10,
            columnGap: 10,
            padding: 10,
          }}
        >
          {years.map((el, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedYear(el);
                setModalVisible(false);
              }}
              key={index}
              style={{
                width: "28%",
                height: "20%",
                backgroundColor:
                  parseInt(selectedYear) === parseInt(el)
                    ? "#013467"
                    : colors.gray100,
                alignContent: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  color: "red",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    fontWeight: "bold",
                    color:
                      parseInt(selectedYear) === parseInt(el)
                        ? colors.white
                        : colors.gray800,
                  }}
                >
                  {el}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}
