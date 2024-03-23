import { View, TouchableOpacity } from "react-native";
export default function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? "red" : "gray";

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            testID={options.tabBarTestID}
            accessibilityRole="button"
          >
            <BottomTab
              type={
                index !== 2 ? Icons.MaterialCommunityIcons : Icons.FontAwesome5
              }
              index={index}
              isFocused={isFocused}
              size={24}
              color={color}
              name={route.name}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
