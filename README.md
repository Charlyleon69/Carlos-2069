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

### Backend

* Node.js
* Express
* TypeScript
* CORS

### Pruebas

* Vitest

## Estructura del proyecto

```text
Carlos-2069/
├── frontend/
├── backend/
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
* Gráfica de resultados de victorias y derrotas.
* Gráfica de victorias por caracol.
* Recarga de saldo mediante SnailPay.
* Validación de datos de tarjeta.
* Manejo de respuestas exitosas y diferentes escenarios de error.

## Persistencia

Para la simulación de autenticación y persistencia se utiliza `localStorage`.

Entre los datos utilizados se encuentran:

* `sisuUser`: información del usuario registrado.
* `sisuLoggedIn`: estado de sesión.
* `sisuBalance`: balance actual.

El balance solamente se actualiza cuando una recarga es procesada correctamente.

La autenticación es parte de la simulación del ejercicio y no representa un sistema de autenticación para producción. En una aplicación real, las contraseñas deberían manejarse mediante un backend y almacenarse utilizando mecanismos seguros de hashing.

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

Además de las pruebas automatizadas, se realizaron pruebas manuales del flujo de registro, inicio de sesión, cierre de sesión, persistencia, recargas aprobadas y diferentes escenarios de error.

## Decisiones principales

Se utilizó `localStorage` para cumplir con la persistencia solicitada para la simulación de usuarios, sesión y balance.

La comunicación entre frontend y backend se realiza mediante HTTP utilizando los endpoints del backend.

La lógica de SnailPay se mantiene en el backend y el frontend consume sus respuestas para actualizar la interfaz y el balance.

Para el manejo de timeout en el frontend se utiliza `AbortController`.

## Uso de inteligencia artificial

Durante el desarrollo se utilizó ChatGPT como herramienta de apoyo para:

* Analizar los requerimientos.
* Revisar decisiones de arquitectura.
* Apoyar en la implementación de funcionalidades.
* Resolver errores durante el desarrollo.
* Proponer y revisar pruebas.
* Revisar documentación.

El código fue ejecutado y validado localmente durante el desarrollo. Las pruebas automatizadas y las pruebas manuales fueron realizadas sobre la aplicación para verificar el funcionamiento de las funcionalidades implementadas.

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
* Pruebas automatizadas.

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

`https://github.com/Charlyleon69/Carlos-2069.git`
