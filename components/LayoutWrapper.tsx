import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")} // Ruta correcta de la imagen
      style={styles.background}
      resizeMode="cover" // Ajusta la imagen
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Asegura que ocupe toda la pantalla
    width: "100%",
    height: "100%",
  },
});

export default LayoutWrapper;
