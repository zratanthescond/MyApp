import {
  Dimensions,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/theme";
import MiddleIcon from "./MiddleIcon";
import { useNavigation } from "@react-navigation/native";
type NavigatorModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function NavigatorModal({
  modalVisible,
  setModalVisible,
}: NavigatorModalProps) {
  const { width, height } = Dimensions.get("screen");
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <Modal
      visible={modalVisible}
      setModalVisible={setModalVisible}
      transparent={true}
    >
      <View
        style={{
          height: height / 6,
          backgroundColor: colors.gray50,
          position: "absolute",
          width: width - 20,
          bottom: 70,

          borderTopLeftRadius: 200,
          borderTopEndRadius: 200,
          borderTopRightRadius: 50,
          borderTopStartRadius: 200,
          zIndex: 0,
          alignSelf: "center",
          elevation: 20,
        }}
      >
        <MiddleIcon
          center={true}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <MiddleIcon
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            bottom={10}
            color={[colors.purple50, colors.purple100, colors.purple500]}
            icon={"filetext1"}
          />
          <MiddleIcon
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            bottom={50}
            color={[colors.purple50, colors.purple500, colors.blue100]}
            icon={"adduser"}
            onPress={() => navigation.navigate("Individu")}
          />
          <MiddleIcon
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            bottom={10}
            color={[colors.blue100, colors.purple500, colors.purple50]}
            icon={"paperclip"}
          />
        </View>
      </View>
    </Modal>
  );
}
