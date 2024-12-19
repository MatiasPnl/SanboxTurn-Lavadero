import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define la interfaz para los turnos
export interface Turno {
  id: number;
  hora: string;
  cliente: string;
  fecha: string;
  type: string; // Campo para almacenar el tipo seleccionado
  vehicle: string;
  extra?: string;
}

// Define la interfaz del contexto
interface TurnosContextType {
  turnos: Turno[];
  agregarTurno: (nuevoTurno: Turno) => void;
  actualizarTurno: (id: number, datosActualizados: Partial<Turno>) => void;
  eliminarTurno: (id: number) => void;
}

// Crea el contexto
const TurnosContext = createContext<TurnosContextType | undefined>(undefined);

// Implementa el proveedor del contexto
export const TurnosProvider = ({ children }: { children: React.ReactNode }) => {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  // Cargar los turnos desde AsyncStorage al iniciar
  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const turnosGuardados = await AsyncStorage.getItem("turnos");
        if (turnosGuardados) {
          const parsedTurnos = JSON.parse(turnosGuardados).map((turno: Turno) => ({
            ...turno,
            type: turno.type, // Asegúrate de mantener el tipo definido
          }));
          setTurnos(parsedTurnos);
        }
      } catch (error) {
        console.error("Error al cargar los turnos:", error);
      }
    };
    cargarTurnos();
  }, []);

  // Guardar los turnos en AsyncStorage cada vez que cambian
  useEffect(() => {
    const guardarTurnos = async () => {
      try {
        await AsyncStorage.setItem("turnos", JSON.stringify(turnos));
      } catch (error) {
        console.error("Error al guardar los turnos:", error);
      }
    };
    guardarTurnos();
  }, [turnos]);

  const agregarTurno = (nuevoTurno: Turno) => {
    setTurnos((prevTurnos) => [...prevTurnos, nuevoTurno]);
  };

  const actualizarTurno = (id: number, datosActualizados: Partial<Turno>) => {
    setTurnos((prevTurnos) =>
      prevTurnos.map((turno) =>
        turno.id === id ? { ...turno, ...datosActualizados } : turno
      )
    );
  };

  const eliminarTurno = (id: number) => {
    setTurnos((prevTurnos) => prevTurnos.filter((turno) => turno.id !== id));
  };

  return (
    <TurnosContext.Provider
      value={{ turnos, agregarTurno, actualizarTurno, eliminarTurno }}
    >
      {children}
    </TurnosContext.Provider>
  );
};

// Hook para usar el contexto
export const useTurnos = () => {
  const context = useContext(TurnosContext);
  if (!context) {
    throw new Error("useTurnos debe usarse dentro de un TurnosProvider");
  }
  return context;
};
