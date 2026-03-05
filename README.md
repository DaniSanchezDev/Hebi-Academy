# 🎓 Hebi Academy - Campus Virtual Moderno


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Un moderno campus virtual desarrollado como Proyecto Final del Ciclo Superior de Desarrollo de Aplicaciones Web (DAW).

## 🚀 Tecnologías Principales

- ⚛️ **React 19** con Server Components
- 🔥 **Next.js 15** (App Router)
- 🎨 **Tailwind CSS** con **ShadCN/UI**
- 🔐 **ClerkJS** para autenticación y autorización
- 🧬 **Prisma** + **Neon Tech** (PostgreSQL)
- 💳 **Stripe** para pagos
- 📝 **React Hook Form** para formularios
- 📱  **Responsive Design**

## ✨ Características Principales

### 👨‍🎓 Para Estudiantes
- 📚 Catálogo de cursos
- 📊 Panel de progreso
- 🏆 Certificados de finalización
- 📱 Aprendizaje móvil

### 👨‍🏫‍ Para Profesores
- 📝 Gestión de cursos
- 🎥 Subida de contenido multimedia
- 📊 Análisis de estudiantes
- 📝 Sistema de evaluaciones

### 🛠️ Administración
- 👥 Gestión de usuarios
- 📈 Analíticas avanzadas
- 💰 Gestión de pagos
- 🔄 Sincronización en tiempo real

## 🚀 Instalación y puesta en marcha

### Requisitos previos
- Node.js 18 o superior
- Yarn (recomendado) o npm
- PostgreSQL
- Cuenta de Clerk y Stripe (para autenticación y pagos)

---

### Guía de Instalación 

Sigue estos pasos para configurar el proyecto Hebi Academy desde cero.

**1. Clonar el Repositorio**

   ```bash
   git clone https://github.com/DaniSanchezDev/Final_Project_DAW_2025.git
   cd Final_Project_DAW_2025/Hebi-academy
   ```
   *Nota: El proyecto se encuentra en la subcarpeta `Hebi-academy`.*

**2. Instalar Dependencias**

   Asegúrate de tener Node.js (v18 o posterior recomendado) y yarn o npm instalados.
   Dentro del directorio `Hebi-academy`, ejecuta:
   ```bash
   yarn install
   # o
   npm install
   ```

**3. Configurar Variables de Entorno**

   Primero, copia el archivo de ejemplo de entorno. En el directorio `Hebi-academy`:
   ```bash
   cp .env.example .env
   ```

   Luego, edita el archivo `.env` y completa los valores requeridos. Necesitarás crear cuentas y obtener claves API para los siguientes servicios:

   *   **Base de Datos (PostgreSQL)**:
       *   Asegúrate de tener un servidor PostgreSQL en ejecución y accesible.
       *   Crea una nueva base de datos para este proyecto.
       *   Añade la URL de conexión de tu base de datos al archivo `.env`. El formato es:
         ```env
         DATABASE_URL="postgresql://TU_USUARIO:TU_CONTRASENA@TU_HOST:TU_PUERTO/TU_NOMBRE_DE_BASE_DE_DATOS"
         ```
         Ejemplo: `DATABASE_URL="postgresql://admin:admin@localhost:5432/hebi_academy_db"`

   *   **Clerk (Autenticación y Gestión de Usuarios)**:
       1.  Regístrate para obtener una cuenta gratuita en [Clerk.com](https://clerk.com/).
       2.  Desde tu panel de control de Clerk, crea una nueva aplicación.
       3.  Navega a "API Keys" para tu aplicación.
       4.  Copia la "Publishable key" y la "Secret key".
       5.  Añade estas claves y configura las URLs de Clerk en tu archivo `.env`:
           ```env
           NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_TU_PUBLISHABLE_KEY
           CLERK_SECRET_KEY=sk_test_TU_SECRET_KEY

           # Estas URLs deben coincidir con la estructura de rutas de tu aplicación
           NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
           NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
           NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
           NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
           ```

   *   **Stripe (Pagos)**:
       1.  Regístrate para obtener una cuenta en [Stripe.com](https://stripe.com/).
       2.  Asegúrate de que tu cuenta esté en "Modo de prueba" para el desarrollo.
       3.  Ve a la sección "Desarrolladores", luego a "Claves API".
       4.  Copia tu "Clave publicable" (comienza con `pk_test_`) y tu "Clave secreta" (comienza con `sk_test_`).
       5.  Añádelas a tu archivo `.env`:
           ```env
           NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_clave_publicable_de_stripe
           STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
           ```
       6.  **Configurar Stripe CLI para Webhooks (Desarrollo Local):**
           *   Instala la CLI de Stripe. Sigue las instrucciones oficiales en [Documentación de Stripe CLI](https://stripe.com/docs/stripe-cli).
             Métodos comunes de instalación:
             ```bash
             # macOS con Homebrew
             brew install stripe/stripe-cli/stripe
             # Windows con Scoop (ejecutar en PowerShell)
              scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git (si aún no está añadido)
              scoop install stripe
             # O descarga directamente desde el sitio web de Stripe.
             ```
             *Nota: Las instalaciones globales de npm/yarn para herramientas CLI pueden no funcionar siempre como se espera o requerir configuración adicional. Es mejor seguir la guía de instalación oficial de Stripe para tu sistema operativo.*
           *   Inicia sesión en tu cuenta de Stripe a través de la CLI:
             ```bash
             stripe login
             ```
             Esto abrirá una ventana del navegador para autenticarte.
           *   Redirige los eventos de webhook a tu servidor de desarrollo local. Este comando también mostrará tu secreto de firma de webhook, que es crucial.
             ```bash
             stripe listen --forward-to localhost:3000/api/webhook
             ```
           *   En la salida del comando `stripe listen`, busca la línea que dice:
             `Your webhook signing secret is whsec_...`
             Copia este valor completo `whsec_...`.
           *   Añade este secreto de firma de webhook a tu archivo `.env`:
             ```env
             STRIPE_WEBHOOK_SECRET=whsec_TU_SECRETO_DE_FIRMA_DE_WEBHOOK
             ```
             **Importante:** Mantén abierta la ventana de terminal de `stripe listen` mientras estés probando cualquier funcionalidad que dependa de los webhooks de Stripe (por ejemplo, actualizaciones de suscripciones, confirmaciones de pago).

   *   **UploadThing (Subida de Archivos)**:
       1.  Regístrate para obtener una cuenta en [UploadThing.com](https://uploadthing.com/).
       2.  Crea una nueva aplicación en tu panel de control de UploadThing.
       3.  Navega a la sección "API Keys" de tu aplicación.
       4.  Copia tu "Secret" (UPLOADTHING_SECRET) y "App ID" (UPLOADTHING_APP_ID).
       5.  Añádelos a tu archivo `.env`:
           ```env
           UPLOADTHING_SECRET=tu_secreto_de_uploadthing
           UPLOADTHING_APP_ID=tu_app_id_de_uploadthing
           ```

   *   **Resend (Envío de Correos Electrónicos)**:
       1.  Regístrate para obtener una cuenta en [Resend.com](https://resend.com/).
       2.  Añade y verifica un dominio de tu propiedad, o usa el dominio de prueba proporcionado por Resend para fines de desarrollo (por ejemplo, `onresend.dev` o similar que te proporcionen).
       3.  Navega a la sección "API Keys" y crea una nueva clave API.
       4.  Copia la clave API generada.
       5.  Añádela a tu archivo `.env`:
           ```env
           RESEND_API_KEY=re_TU_CLAVE_API_DE_RESEND
           ```

   *   **URL Pública de la Aplicación**:
       *   Define la URL base de tu aplicación. Para desarrollo local, esto será `http://localhost:3000`.
       *   Añádela a tu archivo `.env`:
           ```env
           NEXT_PUBLIC_APP_URL=http://localhost:3000
           ```

**4. Configurar la Base de Datos**

   Una vez que tu archivo `.env` esté correctamente configurado (especialmente `DATABASE_URL`):

   *   **Aplicar migraciones de base de datos:** Este comando crea las tablas necesarias en tu base de datos según el esquema de Prisma.
     ```bash
     npx prisma migrate dev
     ```
     Cuando se te solicite, puedes ingresar un nombre para la migración (por ejemplo, `configuracion_inicial`).
   *   **Poblar la base de datos con datos iniciales (seed):** Esto llena tu base de datos con cursos, capítulos, usuarios y datos de progreso pre-creados. Esto es muy recomendable para el desarrollo y las pruebas.
     ```bash
     npx prisma db seed
     ```

**5. Ejecutar la Aplicación**

   *   **Modo de Desarrollo:**
     ```bash
     yarn dev
     # o
     npm run dev
     ```
     La aplicación normalmente estará disponible en [http://localhost:3000](http://localhost:3000).

   *   **Modo de Producción (para despliegue):**
     ```bash
     # Primero, construye la aplicación
     yarn build
     # o
     npm run build

     # Luego, inicia el servidor de producción
     yarn start
     # o
     npm start
     ```

**6. Probar Pagos con Stripe (Modo de Prueba)**

   Cuando tu aplicación esté en ejecución y conectada a Stripe en "Modo de prueba", puedes usar los siguientes datos genéricos de tarjeta de prueba:
   *   **Número de Tarjeta:** `4242 4242 4242 4242`
   *   **Fecha de Expiración:** Cualquier fecha futura (ej. 12/30)
   *   **CVC:** Cualquier número de 3 dígitos (ej. 123)
   *   **Nombre en la Tarjeta:** Cualquier nombre (ej. Usuario de Prueba)
   *   **Código Postal / ZIP:** Cualquier código postal válido (ej. 90210 o 12345)

**7. Reiniciar la Base de Datos (Si es Necesario)**

   Si encuentras problemas o quieres empezar de nuevo con tu base de datos (esto eliminará todos los datos existentes en la base de datos de desarrollo especificada en `DATABASE_URL`):
   ```bash
   # 1. Elimina todas las tablas y datos, luego vuelve a aplicar las migraciones y ejecuta el seed.
   npx prisma migrate reset
   ```
   Este comando normalmente te pedirá confirmación. Después de reiniciar, intentará aplicar las migraciones (`prisma migrate dev`) y poblar la base de datos (`prisma db seed`) automáticamente. Si por alguna razón no lo hace, puedes ejecutar los pasos manualmente:
   ```bash
   # (Opcional, si `migrate reset` no los ejecutó completamente)
   # npx prisma migrate dev
   # npx prisma db seed
   ```
---

### Comandos útiles

| Comando                          | Descripción                                  |
|----------------------------------|----------------------------------------------|
| `yarn install` / `npm install`   | Instala dependencias                         |
| `npx prisma migrate dev`         | Aplica migraciones en desarrollo             |
| `npx prisma migrate deploy`      | Aplica migraciones en producción             |
| `npx prisma db seed`             | Carga datos de prueba                        |
| `yarn dev` / `npm run dev`       | Lanza la app en modo desarrollo              |
| `yarn build && yarn start`       | Lanza la app en modo producción              |

---

### Notas importantes
- No compartas tu archivo `.env` real, sólo el `.env.example`.
- Si cambias la estructura de la base de datos, recuerda ejecutar las migraciones.
- Consulta la documentación técnica (`DOCUMENTACION.md`) para más detalles sobre la arquitectura y funcionalidades.

   
  
## 📦 Despliegue

El proyecto está optimizado para desplegar en [Vercel](https://vercel.com/).

## 🤝 Contribuir
f
Las contribuciones son bienvenidas. Por favor, lee las [guías de contribución](CONTRIBUTING.md) para más detalles.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

- **Daniel Sánchez Vázquez**
- 📧 Email: [danielsanchezvazquez5@gmail.com](mailto:danielsanchezvazquez5@gmail.com)
- 💼 LinkedIn: [Daniel Sánchez](https://www.linkedin.com/in/daniel-sanchez-vazquez/)
- 🌐 Portafolio: [danisanchez.dev](https://portfolio-daniel-sanchez.vercel.app/)
- ⭐ GitHub: [@DaniSanchezDev](https://github.com/DaniSanchezDev)

## 🙌 Agradecimientos

- A mis profesores y compañeros del ciclo por su apoyo.
- A la comunidad de código abierto por las increíbles herramientas utilizadas.

---

⭐ ¡Dale una estrella al proyecto si te gusta! ⭐
