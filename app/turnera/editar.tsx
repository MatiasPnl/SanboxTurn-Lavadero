import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTurnos, Turno } from "../../components/TurnosContext";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditarTurno = () => {
  const { id } = useLocalSearchParams(); // Recupera el ID del turno
  const { turnos, actualizarTurno } = useTurnos(); // Usa la función actualizarTurno del contexto
  const router = useRouter();

  const [hora, setHora] = useState("");
  const [cliente, setCliente] = useState("");
  const [type, setType] = useState<"Lavado General" | "Limpieza Profunda" | "Tratamiento">("Lavado General");
  const [vehicle, setVehicle] = useState<"Auto" | "Camioneta" | "Moto" | "Camión">("Auto");
  const [fecha, setFecha] = useState(new Date()); // Fecha seleccionada
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!id) {
      Alert.alert("Error", "ID de turno no válido");
      router.back();
      return;
    }

    const turno = turnos.find((t) => t.id === Number(id));
    if (turno) {
      setHora(turno.hora);
      setCliente(turno.cliente);
      setType(turno.type);
      setVehicle(turno.vehicle);
      setFecha(new Date(turno.fecha));
    } else {
      Alert.alert("Error", "Turno no encontrado");
      router.back();
    }
  }, [id, turnos, router]);

  const validarHora = (input: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Validación HH:MM
    return regex.test(input);
  };

  const handleHoraChange = (input: string) => {
    let formattedInput = input.replace(/[^0-9]/g, ""); // Elimina no numéricos
    if (formattedInput.length >= 3) {
      formattedInput = `${formattedInput.slice(0, 2)}:${formattedInput.slice(2, 4)}`;
    }
    setHora(formattedInput);
  };

  const mostrarDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleFechaChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setFecha(selectedDate);
  };

  const handleGuardar = () => {
    if (!validarHora(hora)) {
      Alert.alert("Error", "La hora debe estar en formato HH:MM");
      return;
    }
    if (!cliente.trim()) {
      Alert.alert("Error", "Debes ingresar el nombre del cliente");
      return;
    }

    const turnoActualizado: Turno = {
      id: Number(id),
      hora,
      cliente,
      fecha: fecha.toISOString().split("T")[0], // Actualiza fecha en formato YYYY-MM-DD
      type,
      vehicle,
    };

    actualizarTurno(Number(id), turnoActualizado);
    Alert.alert("Éxito", "Turno actualizado correctamente");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Turno</Text>

      {/* Campo de Hora */}
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        keyboardType="numeric"
        value={hora}
        onChangeText={handleHoraChange}
        maxLength={5}
      />

      {/* Campo del Cliente */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del Cliente"
        value={cliente}
        onChangeText={setCliente}
      />

      {/* Selector de Fecha */}
      <Text style={styles.label}>Fecha</Text>
      <View style={styles.fechaContainer}>
        <Button title="Seleccionar Fecha" onPress={mostrarDatePicker} />
        <Text style={styles.fechaTexto}>{fecha.toLocaleDateString("es-ES")}</Text>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleFechaChange}
        />
      )}

      {/* Selector de Tipo de Turno */}
      <Text style={styles.label}>Tipo de Turno</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) =>
          setType(itemValue as "Lavado General" | "Limpieza Profunda" | "Tratamiento")
        }
        style={styles.picker}
      >
        <Picker.Item label="Lavado General" value="Lavado General" />
        <Picker.Item label="Limpieza Profunda" value="Limpieza Profunda" />
        <Picker.Item label="Tratamiento" value="Tratamiento" />
      </Picker>

      {/* Selector de Vehículo */}
      <Text style={styles.label}>Vehículo</Text>
      <Picker
        selectedValue={vehicle}
        onValueChange={(itemValue) =>
          setVehicle(itemValue as "Auto" | "Camioneta" | "Moto" | "Camión")
        }
        style={styles.picker}
      >
        <Picker.Item label="Auto" value="Auto" />
        <Picker.Item label="Camioneta" value="Camioneta" />
        <Picker.Item label="Moto" value="Moto" />
        <Picker.Item label="Camión" value="Camión" />
      </Picker>

      {/* Botón para guardar cambios */}
      <Button title="Guardar Cambios" onPress={handleGuardar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 18,
  },
  label: { fontSize: 16, marginVertical: 5 },
  picker: { height: 50, width: "100%" },
  fechaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  fechaTexto: { fontSize: 16 },
});

export default EditarTurno;
