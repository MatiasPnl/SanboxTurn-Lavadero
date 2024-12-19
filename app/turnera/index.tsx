import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Platform,
  ImageBackground,
  Modal,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useTurnos, Turno } from "../../components/TurnosContext";
import styles from "../../styles/indexstyle"; // Importa los estilos desde el archivo separado
import { Ionicons } from "@expo/vector-icons"; // Ícono de herramienta

const Turnera = () => {
  const { turnos, eliminarTurno } = useTurnos();
  const router = useRouter();
  const [turnoSeleccionado, setTurnoSeleccionado] = useState<Turno | null>(null);
  const [extraDetalle, setExtraDetalle] = useState<string | null>(null); // Estado para detalle de extra
  const [pagados, setPagados] = useState<number[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Cargar turnos pagados desde AsyncStorage al iniciar
  useEffect(() => {
    const cargarPagados = async () => {
      try {
        const pagadosGuardados = await AsyncStorage.getItem("turnosPagados");
        if (pagadosGuardados) {
          setPagados(JSON.parse(pagadosGuardados));
        }
      } catch (error) {
        console.error("Error al cargar turnos pagados:", error);
      }
    };
    cargarPagados();
  }, []);

  // Guardar turnos pagados en AsyncStorage cuando cambian
  useEffect(() => {
    const guardarPagados = async () => {
      try {
        await AsyncStorage.setItem("turnosPagados", JSON.stringify(pagados));
      } catch (error) {
        console.error("Error al guardar turnos pagados:", error);
      }
    };
    guardarPagados();
  }, [pagados]);

  const handleSeleccionarTurno = (turno: Turno) => {
    setTurnoSeleccionado(turno);
  };

  const handleBorrarTurno = (id: number) => {
    eliminarTurno(id);
    setTurnoSeleccionado(null);
    setPagados((prev) => prev.filter((item) => item !== id));
  };

  const togglePago = (id: number) => {
    setPagados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const mostrarDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFechaSeleccionada(selectedDate);
    }
  };

  const turnosFiltrados = turnos.filter(
    (t) => t.fecha === fechaSeleccionada.toISOString().split("T")[0]
  );

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Botón de ajustes */}
        <TouchableOpacity
          style={styles.ajustesBoton}
          onPress={() => router.push("/turnera/motive")}
        >
          <Ionicons name="settings-outline" size={24} color="gray" />
        </TouchableOpacity>

        <Text style={styles.header}>Gestión de Turnos</Text>

        {/* Selector de Fecha */}
        <View style={styles.fechaContainer}>
            <Button
              title="Seleccionar Fecha"
              onPress={mostrarDatePicker}
              color="red" // Cambia el color del botón
            />
          <Text style={styles.fechaTexto}>
            {fechaSeleccionada.toLocaleDateString("es-ES")}
          </Text>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={fechaSeleccionada}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Lista de Turnos */}
        {turnosFiltrados.length === 0 ? (
          <Text style={styles.noTurnos}>No hay turnos disponibles</Text>
        ) : (
          <FlatList
            data={turnosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.turnoContainer}>
                {/* Turno Seleccionado */}
                <TouchableOpacity
                  style={[
                    styles.turno,
                    turnoSeleccionado?.id === item.id &&
                      styles.turnoSeleccionado,
                  ]}
                  onPress={() => handleSeleccionarTurno(item)}
                >
                  <Text style={styles.turnoTexto}>
                    {item.hora} - {item.cliente}
                  </Text>
                </TouchableOpacity>

                {/* Detalles del Turno */}
                <View style={styles.turnoDetalles}>
                  <Text style={styles.detalleTexto}>{item.vehicle}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.extra && item.extra !== "Sin detalles") {
                        setExtraDetalle(item.extra); // Mostrar modal solo si hay detalles
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.detalleTexto,
                        item.extra && item.extra !== "Sin detalles" ? { color: "red" } : { color: "black" },
                      ]}
                    >
                      {item.type} {/* Mostrar el tipo directamente */}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Botón de Pago */}
                <TouchableOpacity
                  style={styles.signoPesosContainer}
                  onPress={() => togglePago(item.id)}
                >
                  <Text
                    style={[
                      styles.signoPesos,
                      pagados.includes(item.id) && styles.pagoRealizado,
                    ]}
                  >
                    $
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Botón flotante para agregar turnos */}
          <TouchableOpacity
            style={[styles.botonFlotante, { backgroundColor: "red" }]}
            onPress={() => router.push("/turnera/agregar")}
          >
            <Text style={styles.botonTexto}>+</Text>
          </TouchableOpacity>

        {/* Modal para detalle de extra */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!extraDetalle}
          onRequestClose={() => setExtraDetalle(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Detalle de Extra:</Text>
              <Text style={styles.modalExtraDetalle}>
                {extraDetalle}
              </Text>
              <Button
                title="Cerrar"
                onPress={() => setExtraDetalle(null)}
                color="gray"
              />
            </View>
          </View>
        </Modal>

        {/* Modal para Editar o Borrar */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={!!turnoSeleccionado}
          onRequestClose={() => setTurnoSeleccionado(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>¿Qué desea hacer?</Text>
              <Button
                title="Editar Turno"
                onPress={() => {
                  router.push({
                    pathname: "/turnera/editar",
                    params: { id: turnoSeleccionado?.id },
                  });
                  setTurnoSeleccionado(null);
                }}
              />
              <Button
                title="Borrar Turno"
                onPress={() => handleBorrarTurno(turnoSeleccionado?.id!)}
                color="red"
              />
              <Button
                title="Cancelar"
                onPress={() => setTurnoSeleccionado(null)}
                color="gray"
              />
            </View>
          </View>
        </Modal>
            {/* Logo y Nombre del Emprendimiento */}
            <View style={styles.footer}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.empresaNombre}>VLOOKUPIFS</Text>
            </View>
      </View>
    </ImageBackground>
  );
};

export default Turnera;
