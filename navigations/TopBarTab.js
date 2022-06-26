import React from "react";
import { Animated, View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";

const TopBarTab = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={label}
            onLongPress={onLongPress}
            style={[styles.topButton, { flex: 1 }, isFocused && styles.activeClass]}
          >
            {isFocused ? (
              <View>
                <Animated.Text
                  style={[
                    styles.topButtonText,
                    {
                      color: "#fff",
                      fontWeight: "700",
                    },
                  ]}
                >
                  {label}
                </Animated.Text>
              </View>
            ) : (
              <Animated.Text style={[styles.topButtonText]}>{label}</Animated.Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TopBarTab;

const styles = StyleSheet.create({
  activeClass: {
    backgroundColor: colors.greenDarkColor,
    borderRadius: 6,
    // elevation: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // borderRightWidth: 0,
    // borderBottomWidth: 5,
    // borderColor: colors.greenColor,
  },
  topButton: {
    // width: "47%",
    backgroundColor: "#fff",
    paddingVertical: 9,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#fff",
  },

  topButton1: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  topButtonText: {
    // color: "#555",
    textAlign: "center",
    textAlignVertical: "top",
    fontSize: 16,
  },
});
