import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import "react-native-reanimated";

import LayoutWrapper from "../components/LayoutWrapper"; // Importa el LayoutWrapper
import { useColorScheme } from "@/hooks/useColorScheme";
import { TurnosProvider } from "../components/TurnosContext"; // Importa el TurnosProvider
import { Turno } from "../components/TurnosContext";
import * as Notifications from "expo-notifications"; // Importa las notificaciones
import * as Device from "expo-device"; // Verifica si es un dispositivo real

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const configureNotifications = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          alert("Se requieren permisos para recibir notificaciones.");
          return;
        }
      } else {
        console.log("Las notificaciones solo funcionan en dispositivos reales.");
      }
    };

    configureNotifications();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Función para programar notificaciones
  const programarNotificaciones = (turnos: Turno[]) => {
    turnos.forEach((turno) => {
      const ahora = new Date();
      const horaTurno = new Date(`${turno.fecha}T${turno.hora}:00`);
  
      // Validar si la fecha es válida
      if (isNaN(horaTurno.getTime())) {
        console.error("Fecha u hora inválida para el turno:", turno);
        return; // Evita procesar turnos con fecha u hora inválida
      }
  
      const diferenciaMinutos = (horaTurno.getTime() - ahora.getTime()) / (1000 * 60);
  
      // Si la diferencia está entre 0 y 15 minutos, programa la notificación
      if (diferenciaMinutos > 0 && diferenciaMinutos <= 15) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "¡Turno Próximo!",
            body: `El turno de ${turno.cliente} comienza en 15 minutos.`,
            sound: true,
          },
          trigger: {
            seconds: Math.floor(diferenciaMinutos * 60), // Redondea a segundos
            repeats: false,
            type: "timeInterval", // Tipo de trigger
          } as Notifications.TimeIntervalTriggerInput, // Define el tipo explícitamente
        });
      }
    });
  };

  return (
    <TurnosProvider>
      <LayoutWrapper> {/* Envuelve todo con la imagen de fondo */}
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="turnera/index" options={{ headerShown: false }} />
            <Stack.Screen name="turnera/agregar" />
            <Stack.Screen name="turnera/editar" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </LayoutWrapper>
    </TurnosProvider>
  );
}
