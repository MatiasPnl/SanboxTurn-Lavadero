import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useTurnos, Turno } from "../../components/TurnosContext";

const AgregarTurno = () => {
  const [hora, setHora] = useState("");
  const [cliente, setCliente] = useState("");
  const [type, setType] = useState<string>(""); // Tipo de turno
  const [extra, setExtra] = useState<string>("Sin detalles"); // Opción por defecto para extra
  const [vehicle, setVehicle] = useState<"Auto" | "Camioneta" | "Moto" | "Camión">("Auto");
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [motiveTypes, setMotiveTypes] = useState<string[]>([]); // Lista de motivos
  const [extraOptions, setExtraOptions] = useState<string[]>([]); // Lista de extras
  const { agregarTurno } = useTurnos();
  const router = useRouter();

// Cargar los motivos y extras desde AsyncStorage
        useEffect(() => {
          const loadData = async () => {
            try {
              const storedMotives = await AsyncStorage.getItem("motiveTypes");
              const storedExtras = await AsyncStorage.getItem("extraOptions");

              // Filtrar motivos y extras inválidos antes de asignarlos al estado
              if (storedMotives) {
                const parsedMotives = JSON.parse(storedMotives).filter(
                  (motive: string) => motive && motive !== "undefined"
                );
                setMotiveTypes(parsedMotives);
              }

              if (storedExtras) {
                const parsedExtras = JSON.parse(storedExtras).filter(
                  (extra: string) => extra && extra !== "undefined"
                );
                setExtraOptions(parsedExtras);
              }
            } catch (error) {
              console.error("Error al cargar datos:", error);
            }
          };
          loadData();
        }, []);

  // Validar hora en formato HH:MM
  const validarHora = (input: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(input);
  };

  // Formatear hora automáticamente
  const handleHoraChange = (input: string) => {
    let formattedInput = input.replace(/[^0-9]/g, "");
    if (formattedInput.length >= 3) {
      formattedInput = `${formattedInput.slice(0, 2)}:${formattedInput.slice(2, 4)}`;
    }
    if (formattedInput.length > 5) {
      formattedInput = formattedInput.slice(0, 5);
    }
    setHora(formattedInput);
  };

  // Guardar turno
  const handleGuardar = () => {
    if (!validarHora(hora)) {
      Alert.alert("Error", "La hora debe estar en formato HH:MM");
      return;
    }
    if (!cliente) {
      Alert.alert("Error", "Debes ingresar el nombre del cliente");
      return;
    }
    if (!type) {
      Alert.alert("Error", "Debes seleccionar un tipo válido");
      return;
    }



    const nuevoTurno: Turno = {
      id: Date.now(),
      hora,
      cliente,
      fecha: fecha.toISOString().split("T")[0],
      type: type, // Asegura que siempre haya un valor
      vehicle,
      extra: extra,
    };

    agregarTurno(nuevoTurno);
    router.back();
  };

  // Mostrar el DatePicker
  const mostrarDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleFechaChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agregar Turno</Text>

      {/* Campo de Hora */}
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        keyboardType="numeric"
        value={hora}
        onChangeText={handleHoraChange}
        maxLength={5}
      />

      {/* Nombre del Cliente */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del Cliente"
        value={cliente}
        onChangeText={setCliente}
      />

      {/* Selector de Fecha */}
      <Text style={styles.label}>Fecha</Text>
      <View style={styles.fechaContainer}>
          <Button
            title="Seleccionar Fecha"
            onPress={mostrarDatePicker}
            color="red" // Cambia el color del botón
          />
        <Text style={styles.fechaTexto}>
          {fecha.toLocaleDateString("es-ES")}
        </Text>
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
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.picker}
      >
        {motiveTypes.length === 0 ? (
          <Picker.Item label="No hay información" value="" />
        ) : (
          motiveTypes.map((motive, index) => (
            <Picker.Item key={index} label={motive} value={motive} />
          ))
        )}
      </Picker>

          {/* Selector de Extra */}
          <Text style={styles.label}>Adicional</Text>
          <Picker
            selectedValue={extra}
            onValueChange={(itemValue) => setExtra(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sin detalles" value="Sin detalles" /> {/* Default */}
            {extraOptions
              .filter((option) => option !== undefined && option.trim() !== "") // Filtra valores no válidos
              .map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
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

      {/* Botón Guardar */}
      <Button
        title="Guardar Turno"
        onPress={handleGuardar}
        color="red" // Cambia el color del botón
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
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

export default AgregarTurno;
