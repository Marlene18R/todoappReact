import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  theme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import { data } from "../../data/todos";
import { useTodos } from "@/hooks/useTodos";
import { TodoItem } from "@/components/TodoItem";
import { ThemeContext } from "@/context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Index() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);

  const handlePress = (id) => {
    router.push(`/details/${id}`);
  };

  const handleAddTodo = async () => {
    const added = await addTodo(text);
    if (added) {
      setText("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input text here"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
        >
          {colorScheme === "light" ? (
            <MaterialCommunityIcons
              name="weather-sunny"
              size={32}
              color={theme.text}
            />
          ) : (
            <MaterialCommunityIcons
              name="weather-night"
              size={32}
              color={theme.text}
            />
          )}
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            theme={theme}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      minWidth: 10,
      borderColor: theme.text,
      color: theme.text,
    },
    buttonText: {
      fontSize: 18,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
  });
}
