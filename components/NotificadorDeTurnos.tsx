import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { View, Text } from "react-native";
import { useTurnos } from "./TurnosContext";

const NotificadorDeTurnos = () => {
  const { turnos } = useTurnos();

  useEffect(() => {
    const programarNotificaciones = async () => {
      // Cancela notificaciones existentes (opcional)
      await Notifications.cancelAllScheduledNotificationsAsync();

      turnos.forEach((turno) => {
        const ahora = new Date();

        // Combina fecha y hora asegurándote de que sean cadenas válidas
        const horaTurno = new Date(`${turno.fecha}T${turno.hora}:00`);
        
        if (isNaN(horaTurno.getTime())) {
          console.error("Fecha o hora inválida:", turno.fecha, turno.hora);
          return; // Evita continuar si la fecha es inválida
        }
        
        const diferenciaMinutos = (horaTurno.getTime() - ahora.getTime()) / (1000 * 60);

        if (diferenciaMinutos > 0 && diferenciaMinutos <= 15) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "¡Turno Próximo!",
              body: `El turno de ${turno.cliente} comienza en 15 minutos.`,
              sound: true,
            },
            trigger: {
              seconds: Math.floor(diferenciaMinutos * 60), // Convierte minutos a segundos
              repeats: false, // No queremos que se repita la notificación
              type: "timeInterval", // Especifica que el trigger es por intervalo de tiempo
            } as Notifications.TimeIntervalTriggerInput,
          });
        }
      });
    };

    programarNotificaciones();
  }, [turnos]);

  return (
    <View>
      <Text>Notificador de Turnos Activo</Text>
    </View>
  );
};

export default NotificadorDeTurnos;
