# 💬 Chat Dinamico

Chat Dinamico es una Single Page Application (SPA) de chat interactivo desarrollada con JavaScript, HTML y CSS.

La aplicación permite conversar con distintos personajes mediante inteligencia artificial, manteniendo una conversación independiente para cada personaje, teneindo la posibilidad de conservar los hilos de conversacion en cada chat y borrandola si se desea.

El proyecto fue desarrollado con un enfoque Mobile First, priorizando la experiencia de uso en dispositivos móviles y adaptando posteriormente la interfaz a pantallas de mayor tamaño.

## 🚀 Demo

🌐 [Demo](https://chat-comunidad.vercel.app/)


💻 [Repositorio](https://github.com/YamilaPlatero/ProyectoM3_YamilaPlatero)

## ✨ Características

- 💬 Chat interactivo con inteligencia artificial.
- 🤖 Tres personajes con personalidades diferentes:
- 🧙 Mago
- 🏗️ Constructor
- 👨‍🍳 Chef
- 💾 Persistencia de conversaciones mediante localStorage.
- 🗂️ Historial independiente para cada personaje.
- 🔢 Máximo de 12 mensajes almacenados por conversación.
- 🗑️ Posibilidad de eliminar la conversación actual.
- 🔄 Reintento automático ante errores 429.
- ⏳ Estados de carga y reintento.
- 🚫 Bloqueo del botón de envío mientras se procesa una solicitud.
- 📊 Visualización del consumo simulado de tokens.
- 🔀 Navegación como SPA.
- 📱 Diseño Mobile First y responsive.
- 🔐 API Key protegida mediante variables de entorno.

## 🛠️ Tecnologías utilizadas

### Frontend

- **HTML5** — estructura de la aplicación.
- **CSS3** — estilos, responsive y diseño Mobile First.
- **JavaScript ES Modules** — lógica y comportamiento.
- **Vite** — construcción y herramientas de desarrollo.
- **Google Gemini API** —	Inteligencia artificial.
- **@google/generative-ai** —	SDK de Gemini.
- **localStorage**	— Persistencia.
- **Vitest	Testing** — Captura de error
- **Vercel	Deploy** — Demo 
- **Serverless Functions**	— Backend/API.
  

### Inteligencia Artificial

- **Google Gemini API** — generación de respuestas.
- **@google/generative-ai** — SDK utilizado para comunicarse con Gemini.

### Persistencia

- **localStorage** — almacenamiento local de las conversaciones.

### Testing

- **Vitest** — pruebas automatizadas.

### Deploy

- **Vercel** — despliegue de la aplicación.
- **Vercel Serverless Functions** — comunicación con la API de Gemini.
  
## 📁 Estructura del proyecto

```
└── 📁ChatComunidad
    └── 📁api
        ├── chat.js
    └── 📁src
        └── 📁css
            └── 📁chat
                ├── chat.css
            └── 📁page
                ├── foto.jpeg
                ├── styles.css
            └── 📁tarjetaperfil
                ├── Don Cacho.jpg
                ├── Eldrin.jpg
                ├── Luigi.jpg
                ├── styleperfil.css
        └── 📁engine
            ├── chatEngine.js
        └── 📁router
            ├── router.js
        └── 📁services
            ├── geminiApi.js
            ├── mockGeminiApi.js
            ├── prompts.js
            ├── quotaSimulator.js
            ├── tokenEstimator.js
        └── 📁tranform
            ├── chatPayload.js
        └── 📁ui
            ├── render.js
        └── 📁views
            ├── chat.js
            ├── inicio.js
            ├── nosotros.js
            ├── notFound.js
        ├── main.js
        ├── navigation.js
    └── 📁test
        ├── chatEngine.test.js
        ├── chatPayload.test.js
        ├── quotaSimulator.test.js
        ├── tokenEstimator.test.js
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── README.md
```

## 📋 Requisitos

Para obtener el proyecto desde GitHub:

#### Ingresá a la carpeta:

- cd ProyectoM3_YamilaPlatero

## 📦 Instalar dependencias

Una vez dentro del proyecto, ejecutá:

npm install

Esto instalará todas las dependencias especificadas en package.json.

## 🔐 Configurar la API de Gemini

El proyecto utiliza una función serverless ubicada en:

#### /api/chat.js

Esta función se encarga de comunicarse con Google Gemini.

La API Key debe configurarse mediante una variable de entorno:

#### GEMINI_API_KEY

Archivo .env, ubicado en la carpeta raiz del proyecto.

Para trabajar localmente se puede utilizar un archivo .env.

Ejemplo:

GEMINI_API_KEY=tu_api_key

## ⚠️ Nunca se debe subir la API Key real a GitHub.

El archivo .env debe estar incluido en .gitignore.

El proyecto incluye un archivo:

.env.example

que sirve como referencia para conocer las variables necesarias sin exponer información sensible.

## ▶️ Ejecutar el proyecto localmente

Una vez instaladas las dependencias, el proyecto se puede levantar utilizando:

- npm i
- npm i -g vercel
- vercel dev

#### La terminal mostrará una dirección local similar a:

http://localhost:3000

Abrí esa dirección en el navegador para utilizar la aplicación.

## 🧪 Ejecutar las pruebas

El proyecto utiliza Vitest para realizar pruebas automatizadas.

Para ejecutar las pruebas:

npm vitest

## 🧭 Cómo utilizar la aplicación

#### 1. Inicio

Al ingresar a la aplicación se muestra la pantalla principal que tiene una breve descripcion de sus principales ideas.

Desde allí se puede navegar por las diferentes secciones:

- Inicio
- Chat
- Nosotros

#### 2. Elegir un personaje

Se puede elegir el personaje la secciónes, en primer instacia podes leer en el inicio cada personaje y sus caracteristicas, haciendo click en el nombre podes ir directo al chat para iniciar conversacion, como tambien una vez estando en chat tenes selector para poder cambiar si asi lo deseas. 
Los personajes disponibles:

### - 🧙 Mago

  Personaje orientado a una personalidad mágica y sabiduria.

### - 🏗️ Constructor

  Personaje orientado a temas relacionados con construcción y proyectos.

### - 👨‍🍳 Chef

  Personaje orientado a gastronomía y cocina.

Al seleccionar un personaje, la aplicación guarda la elección y navega automáticamente hacia el chat.

## 💬 Utilizar el chat

Una vez seleccionado el personaje:

- Ingresá a la pantalla de chat.
- Escribí un mensaje.
- Presioná Enviar.
- También podés presionar Enter.
- La aplicación envía el mensaje a la API.
- Gemini genera la respuesta.
- La respuesta aparece en la conversación, con el nombre del personaje elegido.

El botón de envío se bloquea mientras se procesa la solicitud para evitar envíos duplicados.

## 💾 Persistencia del historial

Las conversaciones se almacenan utilizando localStorage.

Cada personaje posee un historial independiente  y una ejecion de borrado particular.

#### Las claves utilizadas son:

- chatHistory_mago
- chatHistory_constructor
- chatHistory_chef


Esto permite que las conversaciones no se mezclen.

### Por ejemplo:

```text
Mago
 ├── Usuario: Hola
 ├── Mago: ¡Saludos!
 └── Usuario: ¿Qué podés enseñarme?
```

### Mientras que Constructor mantiene su propio historial:

```text
Constructor
 ├── Usuario: Necesito construir una casa
 └── Constructor: Podemos comenzar por...
```

## 🔢 Límite de mensajes

- Cada conversación conserva como máximo:
- 12 mensajes
- Cuando el historial supera ese límite, se conservan únicamente los mensajes más recientes.
- Esto permite limitar la cantidad de información almacenada y enviada a la API.

## 🗑️ Eliminar una conversación

El usuario puede eliminar la conversación del personaje actual mediante el botón:

Borrar conversación

Antes de eliminarla, la aplicación solicita confirmación.

#### Por ejemplo, si el personaje actual es Chef:

chatHistory_chef

será eliminado.

Los historiales de:

chatHistory_mago y chatHistory_constructor

permanecerán intactos.

## 🤖 Funcionamiento de la inteligencia artificial

La comunicación entre la aplicación y Gemini se realiza mediante una función serverless.

### El flujo general es:

```text
Usuario
   │
   ▼
Interfaz
   │
   ▼
chatEngine.js
   │
   ▼
geminiApi.js
   │
   ▼
/api/chat
   │
   ▼
Google Gemini
   │
   ▼
/api/chat
   │
   ▼
geminiApi.js
   │
   ▼
chatEngine.js
   │
   ▼
Respuesta en pantalla
```

La API Key permanece del lado del servidor mediante variables de entorno.

## 🧠 Sistema de personajes

Las instrucciones de los personajes se encuentran centralizadas en:

#### src/services/prompts.js

Cada personaje posee su propia instrucción, lo que permite modificar su personalidad y comportamiento sin alterar la lógica principal del chat.

## 🔄 Manejo de errores

La aplicación contempla diferentes errores durante la comunicación con la API.

Error 429

Cuando la API devuelve un error 429, el sistema muestra un mensaje de reintento y vuelve a intentar realizar la solicitud.

Otros errores

Ante un error inesperado se muestra un mensaje al usuario y se registra información en la consola para facilitar la depuración.


## 📱 Diseño Mobile First

El proyecto fue desarrollado siguiendo una estrategia Mobile First.

Esto significa que la interfaz se diseñó inicialmente pensando en dispositivos móviles y posteriormente se adaptó a pantallas más grandes.

#### Se priorizaron:

- Navegación sencilla.
- Controles accesibles desde pantallas táctiles.
- Distribución vertical del contenido.
- Campos de entrada adaptados a dispositivos móviles.
- Diseño responsive.
- Adaptación progresiva para tablets y desktop.

## 🌐 Deploy

La aplicación está desplegada utilizando Vercel.

- Demo
- Abrir ChatComunidad
- Repositorio
- Ver código en GitHub

Para que la integración con Gemini funcione correctamente en producción es necesario configurar en Vercel:

GEMINI_API_KEY

## 🔒 Seguridad

La API Key de Gemini es información privada y no debe incluirse directamente en el código fuente.

## ✅ Utilizar:

process.env.GEMINI_API_KEY

y configurar la variable en el entorno correspondiente.


## 👩‍💻 Sobre el proyecto

ChatComunidad fue desarrollado como proyecto práctico para aplicar conceptos de desarrollo frontend, arquitectura modular en JavaScript, consumo de APIs, integración con inteligencia artificial, persistencia de datos, manejo de errores, testing y despliegue.

El proyecto busca combinar una interfaz sencilla y responsive con una experiencia de conversación personalizada mediante diferentes personajes.

🔗 Enlaces

🌐 [Demo](https://chat-comunidad.vercel.app/)


💻 [Repositorio](https://github.com/YamilaPlatero/ProyectoM3_YamilaPlatero)

## Nota sobre un error

Al momento de refrescar la pagina, desde el deploy sale un 404, que al momento de problarlo con **Serve** no me sucedia.
