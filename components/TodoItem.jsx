import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
//npx expo install @expo/vector-icons
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

export const TodoItem = React.memo(
  ({ item, onToggle, onRemove, onDetails }) => {
    const { theme } = useContext(ThemeContext);
    const styles = createStyles(theme);
    return (
      <View style={styles.itemRow}>
        <Text
          style={[styles.todoItem, item.completed && styles.completedText]}
          onPress={() => onDetails(item.id)}
          onLongPress={() => onToggle(item.id)}
        >
          {item.title}
        </Text>
        <Pressable onPress={() => onRemove(item.id)}>
          <MaterialCommunityIcons name="delete" size={24} style={styles.icon} />
        </Pressable>
      </View>
    );
  },
);

function createStyles(theme) {
  return StyleSheet.create({
    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 4,
      padding: 10,
      borderBottomColor: "black",
      borderBottomWidth: 1,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
    },
    todoItem: {
      color: theme.text,
      flex: 1,
      fontSize: 18,
    },
    completedText: {
      color: "gray",
      textDecorationLine: "line-through",
    },
    icon: {
      color: theme.icon,
    },
  });
}
