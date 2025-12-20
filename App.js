import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import theme from "./src/theme";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput,
  Button,
  List,
  Checkbox,
  HelperText,
} from "react-native-paper";

export default function App() {
  // moved hooks and handlers inside the component
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setShowError(true); // show error under the field
      return;
    }
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
    setShowError(false); // clear error on successful add
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Material top app bar */}
          <Appbar.Header>
            <Appbar.Content title="Material To-Do" />
          </Appbar.Header>
          {/* Main content under the app bar */}
          <View style={styles.content}>
            {/* Input row */}

            <View style={styles.inputRow}>
              <TextInput
                mode="outlined"
                label="Add a new task" //Accessibility Prompt
                style={styles.textInput}
                value={newTask}
                onChangeText={setNewTask}
              />

              <Button
                mode="contained"
                style={styles.addButton}
                onPress={handleAddTask}
              >
                Add
              </Button>
            </View>
            <View style={{ marginBottom: 8 }}>
              <HelperText type="error" visible={showError}>
                Task cannot be empty.
              </HelperText>
            </View>
            {/* List area */}
            <List.Section>
              <List.Subheader>Today&apos;s tasks</List.Subheader>
              {tasks.map((task) => (
                <List.Item
                  key={task.id}
                  title={task.text}
                  titleStyle={
                    task.completed
                      ? { textDecorationLine: "line-through", color: "#9e9e9e" }
                      : undefined
                  }
                  left={(props) => (
                    <View style={styles.checkboxWrapper}>
                      <Checkbox
                        {...props}
                        status={task.completed ? "checked" : "unchecked"}
                        onPress={() => handleToggleTask(task.id)}
                      />
                    </View>
                  )}
                />
              ))}
            </List.Section>
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background, // from Material theme
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    justifyContent: "center",
    borderRadius: 12,
    height: 48,
    marginTop: 8,
  },
  checkboxWrapper: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    padding: 1,
  },
});
