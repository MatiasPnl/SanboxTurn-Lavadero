🚗 Turnera de Lavadero 🚗
Este es un proyecto de gestión de turnos desarrollado con Expo y create-expo-app. La aplicación permite administrar turnos para un lavadero con opciones avanzadas como selección de fecha, hora, tipo de servicio y tipo de vehículo.

📋 Funcionalidades implementadas
Creación de Turnos

Selección de hora con formato HH:MM (agrega automáticamente :).
Ingreso del nombre del cliente.
Selección de fecha usando un DateTimePicker.
Selección del tipo de servicio:
Lavado General (abreviado: LV Gnrl)
Limpieza Profunda (abreviado: LIM. Prof)
Tratamiento (abreviado: Tratam)
Selección del tipo de vehículo:
Auto
Camioneta
Moto
Camión
Visualización de Turnos

Muestra los turnos filtrados por la fecha seleccionada.
Los datos incluyen: hora, nombre del cliente, tipo de servicio y vehículo.
Visualización con formato limpio y organizado.
Botón flotante + para agregar nuevos turnos.
Edición de Turnos

Modificación de:
Hora
Nombre del cliente
Fecha
Tipo de servicio
Tipo de vehículo
Eliminación de Turnos

Opción para eliminar turnos con confirmación mediante un modal.
Notificaciones Locales

Se envía una notificación 15 minutos antes de que inicie un turno, alertando al usuario.
Requiere permisos de notificación.
Pagos Realizados

Al tocar el signo $, se marca como pagado (verde fluorescente).
Permite alternar entre pago realizado y pendiente.
Almacenamiento Local

Turnos pagados se almacenan usando AsyncStorage.
🚀 Instalación y Ejecución
1. Clona el repositorio
bash
Copiar código
git clone <URL del repositorio>
cd <nombre-del-proyecto>
2. Instala las dependencias
bash
Copiar código
npm install
3. Inicia la aplicación
bash
Copiar código
npx expo start
En la salida, encontrarás opciones para abrir la app en:

Dispositivo físico usando Expo Go.
Emulador Android o Simulador iOS.
Una compilación de desarrollo para evitar limitaciones.

📂 Estructura del Proyecto
bash
Copiar código
.
├── assets/                       # Recursos estáticos (imágenes, fuentes, etc.)
│   └── images/                   # Imagen de fondo utilizada
│
├── components/                   # Componentes reutilizables
│   └── TurnosContext.tsx         # Contexto para la gestión de turnos
│
├── styles/                       # Archivos de estilos centralizados
│   └── indexstyle.ts             # Estilos globales
│
├── app/                          # Directorio principal con rutas y pantallas
│   ├── turnera/                  # Módulo de turnos
│   │   ├── agregar.tsx           # Pantalla para agregar turnos
│   │   ├── editar.tsx            # Pantalla para editar turnos
│   │   └── index.tsx             # Pantalla principal para visualizar turnos
│
├── App.tsx                       # Archivo principal
└── package.json                  # Configuración de dependencias

🔧 Tecnologías Utilizadas
Expo: Framework principal para desarrollo de apps.
React Native: Construcción de la interfaz de usuario.
Expo Notifications: Para notificaciones locales.
AsyncStorage: Almacenamiento local de datos.
React Context: Gestión del estado global para turnos.
React Navigation: Navegación entre pantallas.
DateTimePicker: Selector de fecha y hora.
Picker: Menús desplegables para selección de tipo y vehículo.
📚 Recursos de Documentación
Expo Documentation
React Native Picker
React Navigation
💬 Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la app o encuentras errores, por favor abre un Pull Request o un Issue.