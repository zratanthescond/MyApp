import AppIcon from "@/components/icons/AppIcons";
import { useTheme } from "@/theme";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function InputWithTag({
  title,
  titleWidth,
  tag,
  onChange,
  textInputPlaceholder,
  onIconPress,
  inputDisabled,
}) {
  const { layout, fonts, colors, backgrounds } = useTheme();
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Text
        style={[
          layout.flex_1,
          fonts.bold,
          fonts.size_16,
          fonts.gray800,
          {
            fontFamily: "Lato",
            maxWidth: titleWidth,
            textAlignVertical: "center",
          },
        ]}
      >
        {title}
      </Text>
      <View
        style={[
          layout.flex_1,
          layout.row,

          layout.justifyCenter,
          layout.itemsCenter,
          {
            elevation: 20,
            shadowColor: colors.gray500,
            flex: 1,
            // width: (width * 2) / 3,
            //padding: 10,
            borderRadius: 10,
          },
        ]}
      >
        <TextInput
          style={[
            {
              textAlign: "center",
              //borderRadius: 10,

              backgroundColor: colors.white,
              borderRadius: 10,
              flex: 1,
            },
          ]}
          // value={data.montant.toString()}
          onChangeText={() => {
            onChange();
          }}
          placeholder={textInputPlaceholder}
          keyboardType="numeric"
          maxLength={11}
          {...(inputDisabled == true && {
            editable: false,
            selectTextOnFocus: false,
          })}
        />
        {tag && tag.type === "text" && (
          <Text
            style={[
              backgrounds.white,
              fonts.bold,
              fonts.gray800,
              {
                flex: 1,
                right: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                textAlign: "center",
                position: "absolute",
                paddingHorizontal: 4,
                borderLeftColor: colors.gray200,
                borderLeftWidth: 2,
                // height: "70%",
                alignSelf: "center",
              },
            ]}
          >
            {tag && tag.text}
          </Text>
        )}
        {tag && tag.type == "icon" && (
          <TouchableOpacity
            onPress={() => onIconPress(true)}
            style={{
              position: "absolute",
              right: 0,
              borderLeftColor: colors.gray200,
              borderLeftWidth: 2,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: colors.white,
            }}
          >
            <AppIcon
              name={tag.name}
              type={tag.iconType}
              style={{ padding: 3, flex: 1 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
