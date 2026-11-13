import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_KEY = "todos";

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error guardando todos:", error);
  }
};

export const getTodos = async () => {
  try {
    const data = await AsyncStorage.getItem(TODOS_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error leyendo todos:", error);
    return [];
  }
};
