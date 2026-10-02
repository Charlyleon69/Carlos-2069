# Sistema de Caracoles

Aplicación web de simulación de carreras de caracoles y recargas mediante SnailPay.

El proyecto está dividido en un frontend desarrollado con React + TypeScript y un backend desarrollado con Node.js, Express y TypeScript.

## Tecnologías utilizadas

### Frontend

* React
* TypeScript
* Vite
* HTML / CSS
* LocalStorage
* Fetch API
* Recharts

### Backend

* Node.js
* Express
* TypeScript
* CORS

### Pruebas

* Vitest

### Control de versiones

* Git
* GitHub

## Estructura del proyecto

```text
Carlos-2069/

├── frontend/
│   ├── public/
│   │   └── characters/
│   └── src/
│
├── backend/
│   ├── server.ts
│   └── tests/
│       └── snailpay.test.ts
│
├── README.md
└── ...
```

## Requisitos

* Node.js
* npm
* Git

## Instalación

Clonar el repositorio y entrar al proyecto:

```bash
git clone https://github.com/Charlyleon69/Carlos-2069.git
cd Carlos-2069
```

### Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm run dev
```

El backend expone los endpoints utilizados por la aplicación.

### Frontend

Abrir otra terminal y entrar a:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para acceder a la aplicación.

## Funcionalidades

La aplicación cuenta con las siguientes funcionalidades:

* Registro de usuario.
* Inicio de sesión.
* Cierre de sesión.
* Persistencia de sesión mediante `localStorage`.
* Persistencia del usuario registrado mediante `localStorage`.
* Balance inicial de $0.
* Persistencia del balance.
* Dashboard con nombre del usuario y balance.
* Simulación de carreras de seis caracoles.
* Gráfica tipo donut de apuestas ganadas y perdidas.
* Gráfica de victorias por caracol.
* Recarga de saldo mediante SnailPay.
* Validación de datos de tarjeta.
* Manejo de respuestas exitosas y diferentes escenarios de error.
* Persistencia de los datos ficticios de tarjeta solicitados por el ejercicio.
* Interfaz visual temática de carreras.

## Persistencia

Para la simulación de autenticación y persistencia se utiliza `localStorage`.

Entre los datos utilizados se encuentran:

* `sisuUser`: información del usuario registrado.
* `sisuLoggedIn`: estado de sesión.
* `sisuBalance`: balance actual.
* `sisuCardNumber`: número de tarjeta ficticio utilizado por SnailPay.
* `sisuCvv`: CVV ficticio utilizado por SnailPay.

El balance solamente se actualiza cuando una recarga es procesada correctamente.

La autenticación es parte de la simulación del ejercicio y no representa un sistema de autenticación para producción. En una aplicación real, las contraseñas deberían manejarse mediante un backend y almacenarse utilizando mecanismos seguros de hashing.

Todos los datos de tarjeta utilizados durante la prueba son ficticios y no corresponden a información financiera real.

## SnailPay

SnailPay es una simulación de un servicio de recargas.

La aplicación realiza la solicitud al backend y procesa diferentes resultados:

* Recarga aprobada.
* Datos inválidos.
* Transacción rechazada.
* Error del sistema.
* Timeout.
* Backend no disponible.

Una recarga aprobada devuelve información de autorización y permite actualizar el balance del usuario.

### Datos para reproducir una recarga exitosa

Para reproducir el escenario exitoso se pueden utilizar los datos definidos por la prueba técnica:

```text
Número de tarjeta: 1234123412341234
Fecha de vencimiento: 12/26
CVV: 543
Nombre completo: cualquier valor no vacío
Monto: cualquier cantidad válida mayor que cero
```

Cuando la operación es aprobada:

* El saldo aumenta por el monto solicitado.
* El nuevo saldo se guarda en `localStorage`.
* El dashboard muestra inmediatamente el saldo actualizado.
* Se informa al usuario que la operación fue aprobada.

### Escenarios de error

La integración contempla:

* Datos inválidos.
* Transacción rechazada.
* Error interno de SnailPay.
* Timeout.
* Backend no disponible.

Cuando una operación no es exitosa, el saldo no se modifica y el usuario recibe un mensaje correspondiente al resultado de la operación.

El proyecto utiliza `AbortController` para controlar el timeout desde el frontend.

## Pruebas

Las pruebas automatizadas se ejecutan desde la carpeta `backend`:

```bash
npm test -- --run
```

La suite actual contiene pruebas para:

* Recarga válida.
* Recarga con datos inválidos.
* Timeout.
* Error del sistema.
* Integración con el endpoint real de SnailPay.

Resultado de la validación actual:

```text
Test Files  1 passed

Tests       5 passed
```

Además de las pruebas automatizadas, se realizaron pruebas manuales del flujo de:

* Registro.
* Inicio de sesión.
* Cierre de sesión.
* Persistencia después de recargar la página.
* Acceso al dashboard con sesión activa.
* Recargas aprobadas.
* Recargas con diferentes cantidades.
* Transacción rechazada.
* Error del sistema.
* Backend no disponible / timeout.
* Visualización de gráficos.
* Visualización de personajes.
* Botones, inputs y estados visuales.

### Razón de las pruebas

Las pruebas automatizadas se enfocan principalmente en SnailPay porque es la integración con diferentes respuestas que forma parte importante de la prueba técnica.

Las pruebas manuales se utilizaron para validar el flujo completo de usuario y comprobar que la integración entre frontend, backend, sesión, balance y presentación visual funcionara correctamente.

## Diseño visual

La interfaz fue diseñada con una temática relacionada con carreras de caracoles y velocidad, tomando como referencia visual la película *Turbo*, principalmente en el uso de colores intensos, contrastes y una estética de carreras.

El diseño final utiliza:

* Fondo oscuro.
* Acentos neón.
* Colores relacionados con cada corredor.
* Tarjetas de estadísticas.
* Gráficas con colores coordinados con los personajes.
* Elementos visuales relacionados con carreras.
* Panel de marca en Login y Registro.
* Animaciones de iluminación en la pantalla de acceso.
* Imágenes de los seis corredores.
* Estados visuales para botones, formularios y acciones de SnailPay.

### Herramientas y base utilizada para el diseño

No se utilizó una plantilla de interfaz externa ni un sistema de componentes de terceros como base del diseño final.

La propuesta visual se construyó y adaptó específicamente para este proyecto utilizando CSS y los componentes existentes de React.

Se utilizó ChatGPT como herramienta de apoyo para proponer la dirección visual, distribución de elementos, combinación de colores, estilos de componentes y ajustes de presentación.

Las decisiones finales de integración, selección de elementos, distribución y adaptación al proyecto se realizaron sobre el código existente.

### Personajes

Se integraron seis personajes visuales:

| Corredor      | Color     |
| ------------- | --------- |
| Turbo         | `#00B7FF` |
| Whiplash      | `#504A4A` |
| Burn          | `#FF1744` |
| Skidmark      | `#FFD000` |
| White Shadow  | `#F5F5F5` |
| Pepe Maniobra | `#00FF2A` |

Las imágenes utilizadas se encuentran en:

```text
frontend/public/characters/
```

Los personajes se muestran en el dashboard y sus colores se utilizan también para identificar sus respectivas barras de victorias.

### Dashboard

El dashboard quedó organizado en:

1. Bienvenida y sesión del usuario.
2. Estadísticas generales.
3. Recarga de saldo mediante SnailPay.
4. Gráfica de victorias y derrotas.
5. Gráfica de victorias por corredor.
6. Lista visual de corredores.
7. Cierre de sesión.

El rediseño visual se realizó manteniendo la lógica funcional existente, evitando modificar la autenticación, la persistencia mediante LocalStorage, la lógica de SnailPay y las pruebas automatizadas.

## Decisiones principales

Se utilizó `localStorage` para cumplir con la persistencia solicitada para la simulación de usuarios, sesión y balance.

La comunicación entre frontend y backend se realiza mediante HTTP utilizando los endpoints del backend.

La lógica de SnailPay se mantiene en el backend y el frontend consume sus respuestas para actualizar la interfaz y el balance.

Para el manejo de timeout en el frontend se utiliza `AbortController`.

Para la visualización de información se utilizó Recharts, manteniendo los gráficos dentro del dashboard solicitado.

Durante la etapa de diseño se priorizó conservar la funcionalidad ya validada y realizar los cambios principalmente sobre presentación, estilos, componentes visuales e imágenes.

## Uso de inteligencia artificial

Durante el desarrollo se utilizó ChatGPT como herramienta de apoyo para:

* Analizar los requerimientos.
* Revisar decisiones de arquitectura.
* Apoyar en la implementación de funcionalidades.
* Resolver errores durante el desarrollo.
* Proponer y revisar pruebas.
* Revisar documentación.
* Proponer mejoras de interfaz y experiencia de usuario.
* Proponer la dirección visual y estilos del dashboard.
* Apoyar en la integración y presentación visual de los personajes.

El proceso de trabajo consistió en analizar primero los requerimientos, implementar las funcionalidades, ejecutar pruebas, corregir problemas encontrados y posteriormente realizar una etapa independiente de revisión y mejora visual.

El código fue ejecutado y validado localmente durante el desarrollo. Las pruebas automatizadas y las pruebas manuales fueron realizadas sobre la aplicación para verificar las funcionalidades implementadas.

La asistencia de IA fue utilizada como apoyo y las modificaciones se revisaron y probaron dentro del proyecto antes de incorporarlas a la versión final.

## Estado del proyecto

Se encuentran implementadas las funcionalidades principales solicitadas:

* Frontend React + TypeScript.
* Backend Node.js / Express + TypeScript.
* Registro e inicio de sesión.
* Persistencia mediante `localStorage`.
* Dashboard.
* Simulación de carreras.
* Gráficas.
* SnailPay.
* Manejo de errores.
* Manejo de timeout.
* Pruebas automatizadas.
* Pruebas manuales.
* Diseño visual temático.
* Seis corredores con representación visual.

### Funcionalidades incompletas o problemas conocidos

No existen funcionalidades principales pendientes dentro del alcance definido para la prueba técnica.

Como limitaciones conocidas del ejercicio:

* La autenticación es una simulación local y no está diseñada para producción.
* No existe recuperación de contraseña.
* No existe verificación de correo electrónico.
* No existe administración real de múltiples usuarios.
* SnailPay es un mock y no procesa pagos reales.
* Los datos de carreras y resultados son simulados.
* No existe un motor de carreras o apuestas en tiempo real.
* No se utiliza una base de datos persistente.

Estas limitaciones corresponden al alcance de la prueba técnica y no representan errores de funcionamiento de la implementación.

## Tiempo aproximado invertido

El desarrollo funcional inicial tomó aproximadamente:

```text
6 horas 20 minutos
```

Posteriormente se dedicó tiempo adicional a:

* Revisión de interfaz.
* Diseño visual.
* Integración de personajes.
* Ajustes de Login y Register.
* Ajustes del Dashboard.
* Ajustes de gráficas.
* Ajustes visuales de SnailPay.
* Pruebas posteriores al rediseño.
* Revisión final.
* Publicación de los cambios en GitHub.

El tiempo total aproximado invertido en el proyecto fue de:

```text
≈ 8 horas
```

Esta cifra corresponde a una estimación del tiempo efectivo acumulado durante las sesiones de trabajo y no a un cronometraje continuo minuto a minuto.

## Ejecución rápida

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend, en otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Pruebas:

```bash
cd backend
npm test -- --run
```

## Repositorio

Repositorio público:

https://github.com/Charlyleon69/Carlos-2069.git
