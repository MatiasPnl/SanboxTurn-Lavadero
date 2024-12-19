  import React, { useState, useEffect } from "react";
  import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import styles from "../../styles/motivestyle";

  const Motive = () => {
    const [types, setTypes] = useState<string[]>([]); // Lista de tipos
    const [extras, setExtras] = useState<string[]>([]); // Lista de extras
    const [newType, setNewType] = useState<string>(""); // Nuevo tipo
    const [newExtra, setNewExtra] = useState<string>(""); // Nuevo extra

    // Cargar los datos desde AsyncStorage al iniciar
    useEffect(() => {
      const loadData = async () => {
        try {
          const storedTypes = await AsyncStorage.getItem("motiveTypes");
          const storedExtras = await AsyncStorage.getItem("extraOptions");
          if (storedTypes) setTypes(JSON.parse(storedTypes));
          if (storedExtras) setExtras(JSON.parse(storedExtras));
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };
      loadData();
    }, []);

    // Guardar los datos en AsyncStorage cada vez que cambian
    useEffect(() => {
      const saveData = async () => {
        try {
          await AsyncStorage.setItem("motiveTypes", JSON.stringify(types));
          await AsyncStorage.setItem("extraOptions", JSON.stringify(extras));
        } catch (error) {
          console.error("Error al guardar datos:", error);
        }
      };
      saveData();
    }, [types, extras]);

    // Funciones para gestionar tipos
    const handleAddType = () => {
      if (newType.trim() && types.length < 15) {
        setTypes([...types, newType.trim()]);
        setNewType("");
      } else if (types.length >= 15) {
        Alert.alert("Límite alcanzado", "No puedes agregar más de 15 tipos.");
      }
    };

    const handleEditType = (index: number) => {
      const currentType = types[index];
      const editedType = prompt("Editar tipo", currentType) || currentType;
      if (editedType.trim()) {
        const updatedTypes = [...types];
        updatedTypes[index] = editedType.trim();
        setTypes(updatedTypes);
      }
    };

    const handleDeleteType = (index: number) => {
      Alert.alert(
        "Eliminar tipo",
        "¿Estás seguro de que deseas eliminar este tipo?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => {
              const updatedTypes = types.filter((_, i) => i !== index);
              setTypes(updatedTypes);
            },
          },
        ]
      );
    };

    // Funciones para gestionar extras
    const handleAddExtra = () => {
      if (newExtra.trim() && extras.length < 15 && newExtra !== "undefined") {
        setExtras([...extras, newExtra.trim()]);
        setNewExtra("");
      } else if (extras.length >= 15) {
        Alert.alert("Límite alcanzado", "No puedes agregar más de 15 extras.");
      }
    };

    const handleEditExtra = (index: number) => {
      const currentExtra = extras[index];
      const editedExtra = prompt("Editar extra", currentExtra) || currentExtra;
      if (editedExtra.trim()) {
        const updatedExtras = [...extras];
        updatedExtras[index] = editedExtra.trim();
        setExtras(updatedExtras);
      }
    };

    const handleDeleteExtra = (index: number) => {
      Alert.alert(
        "Eliminar extra",
        "¿Estás seguro de que deseas eliminar este extra?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => {
              const updatedExtras = extras.filter((_, i) => i !== index);
              setExtras(updatedExtras);
            },
          },
        ]
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gestionar Tipos de Turnos</Text>

        {/* Sección de Tipos */}
        <TextInput
          style={styles.input}
          placeholder="Agregar nuevo tipo"
          value={newType}
          onChangeText={setNewType}
        />
        <Button title="Agregar Tipo" onPress={handleAddType} disabled={types.length >= 15 || !newType.trim()} />
        <FlatList
          data={types}
          keyExtractor={(item, index) => `type-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => handleEditType(index)}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteType(index)}>
                  <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {types.length >= 15 && <Text style={styles.limitText}>Has alcanzado el máximo de 15 tipos.</Text>}

        {/* Sección de Extras */}
        <Text style={styles.title}>Gestionar Adicionales</Text>
        <TextInput
          style={styles.input}
          placeholder="Agregar nueva opción extra"
          value={newExtra}
          onChangeText={setNewExtra}
        />
        <Button title="Agregar Extra" onPress={handleAddExtra} disabled={extras.length >= 15 || !newExtra.trim()} />
        <FlatList
          data={extras}
          keyExtractor={(item, index) => `extra-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => handleEditExtra(index)}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteExtra(index)}>
                  <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {extras.length >= 15 && <Text style={styles.limitText}>Has alcanzado el máximo de 15 extras.</Text>}
      </View>
    );
  };

  export default Motive;
