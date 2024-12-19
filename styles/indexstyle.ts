import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent", // Para que la imagen de fondo sea visible
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  fechaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  fechaTexto: { fontSize: 18, fontWeight: "bold" },
  noTurnos: { textAlign: "center", fontSize: 16, marginTop: 20 },
  turnoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  turno: { flex: 1, marginRight: 10 },
  turnoSeleccionado: { borderColor: "blue", borderWidth: 2, borderRadius: 8 },
  turnoTexto: { fontSize: 16, fontWeight: "bold" },
  turnoDetalles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  detalleTexto: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signoPesosContainer: {
    paddingHorizontal: 15, // Aumenta área táctil
    paddingVertical: 10, // Más alto el contenedor
    marginLeft: 10, // Espacio extra entre texto y símbolo
  },
  signoPesos: {
    fontSize: 23,
    fontWeight: "bold",
    color: "black",
  },
  pagoRealizado: { color: "#00FF00" },
  botonFlotante: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  botonTexto: { color: "#fff", fontSize: 30, fontWeight: "bold" },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalExtraDetalle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  ajustesBoton: {
    position: "absolute",
    top: 3,
    right: 3,
    padding: 15, // Mantén o ajusta para el área táctil
    backgroundColor: "#ffff",
    borderRadius: 25,
  },
  logo: {
    width: 20, // Tamaño ajustado para que sea visible pero sutil
    height: 10,
    marginBottom: 0,
  },
  
  empresaNombre: {
    fontSize: 14,
    fontWeight: "400", // No demasiado destacado
    textAlign: "left",
    color: "gray", // Sutil color gris
  },
  
  footer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row", // Para que el logo y el nombre estén alineados horizontalmente
    alignItems: "center",
  },
});

export default styles;
