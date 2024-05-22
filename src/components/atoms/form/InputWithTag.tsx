import AppIcon from "@/components/icons/AppIcons";
import { useTheme } from "@/theme";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// Interface pour la balise (tag) de type texte
interface TextTag {
  type: "text";
  text: string;
}

// Interface pour la balise (tag) de type icône
interface IconTag {
  type: "icon";
  name: string;
  iconType: string;
}

// Union des deux types de balises possibles
type Tag = TextTag | IconTag;

// Interface pour les props du composant InputWithTag
interface InputWithTagProps {
  title: string;
  titleWidth: number;
  tag?: Tag;
  onChange: () => void;
  textInputPlaceholder: string;
  onIconPress: (arg: boolean) => void;
  inputDisabled?: boolean;
}

const InputWithTag: React.FC<InputWithTagProps> = ({
  title,
  titleWidth,
  tag,
  onChange,
  textInputPlaceholder,
  onIconPress,
  inputDisabled,
}) => {
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
            shadowColor: colors.gray50,
            flex: 1,
            borderRadius: 10,
          },
        ]}
      >
        <TextInput
          style={[
            {
              textAlign: "center",
              backgroundColor: colors.white,
              borderRadius: 10,
              flex: 1,
            },
          ]}
          onChangeText={() => {
            onChange();
          }}
          placeholder={textInputPlaceholder}
          keyboardType="numeric"
          maxLength={11}
          editable={!inputDisabled}
          selectTextOnFocus={!inputDisabled}
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
                alignSelf: "center",
              },
            ]}
          >
            {tag.text}
          </Text>
        )}
        {tag && tag.type === "icon" && (
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
};

export default InputWithTag;
