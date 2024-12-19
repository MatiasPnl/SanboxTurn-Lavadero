import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    color: "#007bff",
    marginRight: 10,
  },
  deleteButton: {
    color: "#dc3545",
  },
  limitText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default styles;
