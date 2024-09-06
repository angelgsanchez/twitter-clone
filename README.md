## Funcionalidades

- Autenticación con Firebase Authentication
- Componentes de React con tipado fuerte usando TypeScript
- Los usuarios pueden añadir tweets, dar "me gusta", retuitear y responder
- Los usuarios pueden eliminar tweets, añadir un tweet a marcadores y fijar su tweet
- Los usuarios pueden añadir imágenes y GIFs a los tweets
- Los usuarios pueden seguir y dejar de seguir a otros usuarios
- Los usuarios pueden ver a sus seguidores y seguidos, así como las listas de otros usuarios
- Los usuarios pueden ver todos los usuarios y la lista de tendencias
- Actualización en tiempo real de "me gusta", retweets, y perfil de usuario
- Datos de tendencias en tiempo real desde la API de Twitter
- El usuario puede editar su perfil
- Diseño responsivo para móviles, tabletas y computadoras de escritorio
- Los usuarios pueden personalizar el esquema de colores y el fondo del sitio
- Todas las imágenes subidas se almacenan en Firebase Cloud Storage

## Tecnología

Next.js
TypeScript
Tailwind CSS
Firebase
SWR
Headless UI
React Hot Toast
Framer Motion

## Desarrollo

Aquí están los pasos para ejecutar el proyecto localmente.

1. Instalar dependencias

   npm i

2. Crea un proyecto de Firebase y selecciona la aplicación web

3. Añade tu configuración de Firebase a .env.development. Nota que NEXT_PUBLIC_MEASUREMENT_ID es opcional

4. Asegúrate de haber habilitado los siguientes servicios de Firebase:

Autenticación: Habilita el método de inicio de sesión con Google.
Cloud Firestore: Crea una base de datos y configura su ubicación a tu región más cercana.
Cloud Storage: Crea un bucket de almacenamiento.

5. Instala Firebase CLI globalmente

   npm i -g firebase-tools

6. Inicia sesión en Firebase

   firebase login

7. Obtén el ID de tu proyecto

   firebase projects:list

8. Selecciona el ID de tu proyecto

   firebase use your-project-id

9. A partir de este punto, tienes dos opciones: ejecutar este proyecto usando Firebase en la nube o localmente usando el emulador.

   Usando el Backend en la Nube de Firebase:

   1. Despliega las reglas de Firestore, los índices de Firestore, y las reglas de Cloud Storage

      firebase deploy --except functions

   2. Ejecuta el proyecto

      npm run dev
