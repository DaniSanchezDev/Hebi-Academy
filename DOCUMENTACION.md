# Documentación Técnica - Hebi Academy

## Índice
1. [Descripción General](#-descripción-general)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
4. [Configuración del Proyecto](#-configuración-del-proyecto)
5. [Integración con Stripe](#-integración-con-stripe)
6. [Autenticación](#-autenticación)
7. [Base de Datos](#-base-de-datos)
8. [Estructura de Carpetas](#-estructura-de-carpetas)
9. [Utilidades](#-utilidades)
10. [Gestión de Cursos](#-gestión-de-cursos)
11. [Gestión de Progreso del Estudiante](#-gestión-de-progreso-del-estudiante)
12. [Gestión de Imágenes del Curso](#-gestión-de-imágenes-del-curso)
13. [Panel del Profesor](#-panel-del-profesor)
14. [API de Cursos](#-api-de-cursos)
15. [Flujo de Trabajo del Profesor](#-flujo-de-trabajo-del-profesor)
16. [Analytics y Reporting](#-analytics-y-reporting)
17. [Seguridad](#-seguridad)
18. [Notificaciones](#-notificaciones)
19. [Integración con Clerk](#-integración-con-clerk)
20. [Editor de Código JavaScript](#-editor-de-código-javascript)
21. [Sistema de Diseño](#-sistema-de-diseño)

## Descripción General

Hebi Academy es una plataforma educativa en línea que permite a estudiantes y profesores interactuar en un entorno de aprendizaje digital. La aplicación está construida con Next.js 15 y utiliza TypeScript para un desarrollo más seguro y mantenible. Ofrece un conjunto completo de herramientas tanto para estudiantes como para profesores, incluyendo gestión de cursos, seguimiento de progreso, sistema de pagos, editor de código integrado y analíticas avanzadas.

## Configuración del Proyecto y Puesta en Marcha

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd Hebi-academy
```

### 2. Instalar dependencias

```bash
yarn install
```
O si usas npm:
```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y completa los valores necesarios:

```bash
cp .env.example .env
```

Asegúrate de rellenar los valores correctos para tu base de datos, Stripe, Clerk, etc.

### 4. Configuración y migración de la base de datos

Asegúrate de tener PostgreSQL corriendo y crea una base de datos llamada `hebi_academy` (puedes cambiar el nombre en `.env`).

```sql
CREATE DATABASE hebi_academy;
```

Aplica las migraciones con Prisma:

```bash
npx prisma migrate dev
```

### 5. (Opcional) Cargar datos de prueba

Si tienes un script de seed configurado, puedes poblar la base de datos con datos de ejemplo:

```bash
npx prisma db seed
```

### 6. Lanzar la aplicación

Para entorno de desarrollo:

```bash
yarn dev
```
O:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

Para entorno de producción:

```bash
yarn build && yarn start
```
O:
```bash
npm run build && npm start
```

### 7. Resumen de scripts útiles

| Comando                          | Descripción                                  |
|----------------------------------|----------------------------------------------|
| `yarn install` / `npm install`   | Instala dependencias                         |
| `npx prisma migrate dev`         | Aplica migraciones en desarrollo             |
| `npx prisma migrate deploy`      | Aplica migraciones en producción             |
| `npx prisma db seed`             | Carga datos de prueba                        |
| `yarn dev` / `npm run dev`       | Lanza la app en modo desarrollo              |
| `yarn build && yarn start`       | Lanza la app en modo producción              |

## Estructura del Proyecto

```
hebi-academy/
├── app/
│   ├── (auth)/
│   │   └── sign-in/          # Página de inicio de sesión
│   ├── (routes)/
│   │   ├── (root)/           # Páginas públicas (home, etc.)
│   │   ├── certificates/     # Gestión de certificados
│   │   ├── code-editor/      # Editor de código JavaScript interactivo
│   │   ├── courses/          # Visualización de cursos públicos
│   │   ├── my-courses/       # Cursos comprados por el estudiante
│   │   ├── orders/           # Historial de compras del usuario
│   │   └── teacher/
│   │       ├── [courseId]/   # Gestión específica de un curso
│   │       │   ├── [chapterId]/ # Edición de un capítulo específico
│   │       │   └── components/  # Componentes de edición de curso
│   │       │       ├── Chapters/
│   │       │       ├── CourseForm/
│   │       │       ├── CourseImage/
│   │       │       ├── CoursePrice/
│   │       │       └── Title/
│   │       ├── analytics/    # Dashboard de analíticas
│   │       │   └── components/ # Componentes de visualización
│   │       │       ├── Payments/
│   │       │       ├── SubscriptorsChart/
│   │       │       └── TotalRevenue/
│   │       └── components/   # Componentes para el dashboard de profesor
│   │           ├── Header/
│   │           └── ListCourses/
│   ├── api/                  # API routes de Next.js
│   │   ├── analytics/        # Endpoints de datos estadísticos
│   │   ├── course/           # CRUD de cursos
│   │   ├── get-user-progress/ # Seguimiento de progreso
│   │   ├── uploadthing/      # Manejo de subida de archivos
│   │   └── webhook/          # Webhooks para Stripe
│   ├── globals.css           # Estilos globales y variables CSS
│   └── layout.tsx            # Layout principal de la aplicación
├── components/
│   ├── Shared/               # Componentes compartidos en toda la app
│   │   ├── EditorDescription/ # Editor de texto enriquecido
│   │   ├── Footer/           # Pie de página
│   │   ├── IconBadge/        # Badges con iconos
│   │   ├── ListCourses/      # Listado de cursos reutilizable
│   │   └── Navbar/           # Barra de navegación
│   └── ui/                   # Componentes de UI reutilizables
│       ├── alert-dialog.tsx  # Diálogos de alerta
│       ├── button.tsx        # Botones estilizados
│       ├── card.tsx          # Tarjetas para contenido
│       ├── checkbox.tsx      # Componente de checkbox
│       ├── dialog.tsx        # Diálogos modales
│       ├── dropdown-menu.tsx # Menús desplegables
│       ├── form.tsx          # Componentes de formulario
│       ├── input.tsx         # Campos de entrada
│       ├── label.tsx         # Etiquetas para formularios
│       ├── progress.tsx      # Barras de progreso
│       ├── select.tsx        # Menús de selección
│       ├── separator.tsx     # Separadores visuales
│       ├── skeleton.tsx      # Placeholders de carga
│       ├── table.tsx         # Tablas de datos
│       └── toast.tsx         # Notificaciones toast
├── actions/                  # Server Actions de Next.js
│   ├── getCourseBySlug.ts    # Obtener curso por slug
│   ├── getHomeCourses.ts     # Obtener cursos para la página principal
│   ├── getLastPurchases.ts   # Obtener últimas compras
│   ├── getPurchaseCourseById.ts # Verificar compra de curso
│   ├── getPurchasedCourse.ts # Obtener detalles de compra
│   ├── getPurchasedCourses.ts # Obtener todos los cursos comprados
│   ├── getReceipStripe.ts    # Obtener recibo de Stripe
│   ├── getRevenueByMonth.ts  # Calcular ingresos mensuales
│   ├── getStripeCustomerId.ts # Obtener ID de cliente en Stripe
│   ├── getSuscribersByMonth.ts # Obtener suscriptores por mes
│   ├── getUserProgress.ts    # Obtener progreso general del usuario
│   ├── getUserProgressByCourse.ts # Progreso en un curso específico
│   └── getUserPurchases.ts   # Obtener historial de compras
├── hooks/                    # Hooks personalizados de React
├── lib/                      # Utilidades y configuraciones
│   ├── prisma.ts             # Cliente de Prisma para la BD
│   └── utils.ts              # Funciones de utilidad
├── prisma/                   # Configuración de la base de datos
│   └── schema.prisma         # Esquema de la base de datos
├── public/                   # Archivos estáticos
├── utils/                    # Utilidades adicionales
│   └── uploadthing.ts        # Configuración de UploadThing
├── .gitignore                # Archivos ignorados por git
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración de TypeScript
└── DOCUMENTACION.md          # Esta documentación
```

## Tecnologías Utilizadas

### Frontend
- **Next.js 15**: Framework de React para aplicaciones web modernas
- **TypeScript**: Lenguaje tipado para mayor seguridad en el desarrollo
- **Tailwind CSS**: Framework CSS para estilos personalizables
- **React Hook Form**: Para el manejo de formularios
- **Zod**: Validación de esquemas
- **Sonner**: Notificaciones tipo toast
- **Lucide React**: Iconos para la interfaz de usuario
- **Axios**: Cliente HTTP para peticiones a la API
- **@hello-pangea/dnd**: Biblioteca para arrastrar y soltar elementos
- **@radix-ui/react-***: Componentes de interfaz de usuario accesibles (alert-dialog, checkbox, dialog, etc.)
- **react-quill-new**: Editor de texto enriquecido
- **tw-animate-css**: Animaciones CSS para Tailwind
- **clsx y tailwind-merge**: Utilidades para gestionar clases de Tailwind CSS
- **CodeMirror**: Editor de código interactivo para JavaScript
- **Recharts**: Biblioteca para visualización de datos y gráficos

### Backend
- **Next.js API Routes**: Para la creación de endpoints de la API
- **Next.js Server Actions**: Para operaciones del servidor con acceso directo a la BD
- **Prisma**: ORM para la interacción con la base de datos
- **PostgreSQL**: Base de datos relacional
- **Stripe**: Procesamiento de pagos y suscripciones
- **UploadThing**: Servicio para la gestión y almacenamiento de archivos

### Autenticación
- **Clerk**: Gestión de autenticación y usuarios

## Configuración del Proyecto

### Requisitos Previos
- Node.js 18+
- npm o yarn
- PostgreSQL
- Cuenta de Clerk para autenticación

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd hebi-academy
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/hebi_academy?schema=public"
   NEXTAUTH_SECRET="tu_secreto_seguro"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Configurar Clerk:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="tu_clave_publica"
   CLERK_SECRET_KEY="tu_clave_secreta"
   ```

5. Ejecutar migraciones de Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

## Autenticación

La autenticación está gestionada por Clerk, que proporciona:
- Registro e inicio de sesión de usuarios
- Autenticación social (Google, GitHub, etc.)
- Gestión de sesiones

## Editor de Código JavaScript

El Editor de Código JavaScript es una herramienta interactiva integrada en la plataforma que permite a los estudiantes practicar y experimentar con código JavaScript directamente en el navegador.

### Características Principales

- **Editor CodeMirror**: Editor de código con resaltado de sintaxis para JavaScript
- **Ejecución en tiempo real**: Capacidad de ejecutar código JavaScript directamente en el navegador
- **Consola integrada**: Visualización de resultados y errores en una consola simulada
- **Código de ejemplo predeterminado**: Ejemplos listos para usar y modificar
- **Interfaz responsive**: Diseño adaptable para diferentes tamaños de pantalla
- **Captura de salida de consola**: Intercepta y muestra llamadas a `console.log`
- **Gestión de errores**: Captura y muestra errores de ejecución de forma amigable

### Componentes

#### CodeMirrorEditor

Componente encapsulado que proporciona la funcionalidad principal del editor:

- Utiliza la biblioteca CodeMirror para la edición de código
- Soporta resaltado de sintaxis para JavaScript
- Maneja eventos de cambio de código
- Configurable a través de props

#### Página del Editor

La página principal del editor (`/code-editor/page.tsx`) implementa:

- Área de editor con configuración personalizada
- Área de resultados para mostrar la salida del código
- Controles para ejecutar y reiniciar el código
- Diseño visual con la paleta de colores indigo-violeta
- Indicadores de estado (ejecución, completado, error)

### Integración con el Aprendizaje

El editor de código se integra con el proceso de aprendizaje para permitir a los estudiantes:

- Practicar conceptos de programación en JavaScript
- Experimentar con código sin necesidad de configurar un entorno de desarrollo
- Recibir feedback inmediato sobre su código
- Complementar las lecciones teóricas con ejercicios prácticos

### Implementación Técnica

```typescript
// Ejecutar código de forma segura
const handleRunCode = () => {
  setIsRunning(true);
  setOutput("");

  try {
    const originalConsoleLog = console.log;
    let outputResult = "";

    // Capturar salidas de console.log
    console.log = (...args) => {
      outputResult += args.join(" ") + "\n";
    };

    // Ejecutar el código del usuario
    const executeCode = new Function(code);
    executeCode();
    
    // Restaurar console.log original
    console.log = originalConsoleLog;

    setOutput(outputResult || "Code executed successfully (no console output)");
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : String(error);
    setOutput(`Error: ${errorMessage}`);
  }

  setIsRunning(false);
};
```

## Sistema de Diseño

El sistema de diseño de Hebi Academy sigue una estética consistente basada en una paleta de colores indigo-violeta, con elementos cuidadosamente diseñados para proporcionar una experiencia visual coherente y moderna.

### Paleta de Colores

- **Colores primarios**: Gradientes de indigo a violeta para los componentes principales
- **Fondos**: Gradientes suaves `from-indigo-50 to-violet-50` para áreas de contenido
- **Bordes**: Color `border-indigo-100` con bordes redondeados `rounded-xl`
- **Elementos activos**: Fondos más intensos `from-indigo-200 to-violet-200` con sombras pronunciadas
- **Elementos interactivos**: Estados hover con cambios sutiles de color y sombra
- **Elementos completados**: Toques de verde claro para indicar finalización

### Componentes UI

- **Tarjetas**: Fondos con gradiente, bordes redondeados y sombras suaves
- **Botones**: Varios estilos según su importancia y contexto
- **Campos de formulario**: Diseño consistente con validación visual
- **Tablas**: Diseño limpio con alternancia de colores para mejor legibilidad
- **Gráficos**: Visualizaciones con la misma paleta de colores

### Principios de Diseño

- **Consistencia**: Uso coherente de estilos en toda la aplicación
- **Jerarquía visual**: Elementos organizados según su importancia
- **Accesibilidad**: Contrastes adecuados y textos legibles
- **Feedback visual**: Indicadores claros para acciones del usuario
- **Estética moderna**: Diseño limpio con toques de profundidad visual (sombras, gradientes)

## Autenticación

La autenticación está gestionada por Clerk, que proporciona:
- Registro e inicio de sesión de usuarios
- Autenticación social (Google, GitHub, etc.)
- Gestión de sesiones
- Protección de rutas

### Rutas de Autenticación
- `/sign-in`: Inicio de sesión
- `/sign-up`: Registro de nuevo usuario
- `/sign-out`: Cerrar sesión

## Base de Datos

El proyecto utiliza PostgreSQL como base de datos principal, con Prisma como ORM. El esquema de la base de datos se define en `prisma/schema.prisma`.

### Modelos Principales

```prisma
model Course {
  id          String  @id @default(uuid())
  userId      String  // ID del profesor en Clerk
  title       String  @db.Text
  slug        String  @unique @db.Text
  description String? @db.Text
  imageURL    String? @db.Text
  price       String?
  isPublished Boolean @default(false)
  level       String? @db.Text
  category    String? @db.Text

  chapters  Chapter[]
  purchases Purchase[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Chapter {
  id          String  @id @default(uuid())
  title       String
  description String? @db.Text
  videoUrl    String? @db.Text
  position    Int
  isPublished Boolean @default(false)
  isFree      Boolean @default(false)
  courseId    String

  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  userProgress UserProgress[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model UserProgress {
  id          String  @id @default(uuid())
  userId      String
  chapterId   String
  chapter     Chapter @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  isCompleted Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, chapterId])
  @@index([chapterId])
}

model Purchase {
  id       String @id @default(uuid())
  userId   String
  courseId String
  course   Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  price    Float

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, courseId])
  @@index([courseId])
}

model StripeCustomer {
  id               String @id @default(uuid())
  userId           String @unique
  stripeCustomerId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Relaciones entre Modelos

- Un **Course** puede tener múltiples **Chapters** y **Purchases**
- Un **Chapter** pertenece a un **Course** y puede tener múltiples **UserProgress**
- Un **UserProgress** conecta a un usuario con un **Chapter** específico
- Una **Purchase** conecta a un usuario con un **Course** comprado
- **StripeCustomer** mapea el ID de usuario de Clerk con el ID de cliente en Stripe

## Estructura de Carpetas

- `/app`: Contiene las rutas y páginas de la aplicación
  - `/(auth)`: Rutas de autenticación
  - `/(routes)`: Rutas protegidas
    - `/(root)`: Rutas principales
    - `/teacher`: Rutas específicas para profesores
- `/components`: Componentes reutilizables
  - `/Shared`: Componentes compartidos
  - `/ui`: Componentes de interfaz de usuario
- `/lib`: Utilidades y configuraciones
  - `prisma.ts`: Configuración del cliente de Prisma
  - `utils.ts`: Funciones de utilidad
- `/prisma`: Configuración y migraciones de la base de datos
- `/public`: Archivos estáticos

## Utilidades

### `lib/utils.ts`
Contiene funciones de utilidad para el manejo de clases CSS con Tailwind:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `lib/prisma.ts`
Configuración del cliente de Prisma para evitar múltiples instancias:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { 
    prisma?: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'production') globalForPrisma.prisma = prisma

export default prisma
```

## Gestión de Cursos

La plataforma permite a los profesores gestionar sus cursos de manera eficiente, incluyendo la creación, edición y eliminación de cursos.

### Creación de Cursos

Los profesores pueden crear nuevos cursos a través de un formulario intuitivo que incluye:
- Validación de campos
- Generación automática de slugs
- Notificaciones de éxito/error

```tsx
// Ejemplo del formulario de creación de curso

### Componentes Principales

#### `CourseForm`

Formulario principal para la creación y edición de cursos.

- **Props**:
  - `course`: Objeto con los datos del curso (opcional, para edición)
  - `onSubmit`: Función que se ejecuta al enviar el formulario

#### `CourseImage`

Componente para cargar y previsualizar la imagen del curso.

- **Props**:
  - `idCourse`: ID del curso
  - `imageCourse`: URL de la imagen actual (opcional)
  - `onChange`: Función que se ejecuta cuando se actualiza la imagen

#### `CoursePrice`

Componente para configurar el precio del curso.

- **Props**:
  - `idCourse`: ID del curso
  - `priceCourse`: Precio actual (opcional)
  - `onChange`: Función que se ejecuta cuando se actualiza el precio

#### `Chapters`

Componente para gestionar los capítulos del curso.

- **Props**:
  - `idCourse`: ID del curso
  - `chapters`: Array de capítulos existentes
  - `onReorder`: Función que se ejecuta al reordenar capítulos
  - `onEdit`: Función que se ejecuta al editar un capítulo
  - `onDelete`: Función que se ejecuta al eliminar un capítulo

#### `ChapterForm`

Componente para crear y editar capítulos.

- **Props**:
  - `chapter`: Objeto con los datos del capítulo (opcional, para edición)
  - `courseId`: ID del curso al que pertenece el capítulo
  - `onSubmit`: Función que se ejecuta al guardar el capítulo
  - `onCancel`: Función que se ejecuta al cancelar la edición

### API de Capítulos

#### Publicar/Ocultar Capítulo

```typescript
PATCH /api/course/[courseId]/chapter/[chapterId]

// Cuerpo de la petición
{
  "isPublished": boolean
}

// Respuesta exitosa (200 OK)
{
  "success": true,
  "chapter": { ...datos del capítulo actualizado... }
}
```

#### Reordenar Capítulos

```typescript
PUT /api/course/[courseId]/chapter/reorder

// Cuerpo de la petición
{
  "list": [
    { "id": "chapter1", "position": 0 },
    { "id": "chapter2", "position": 1 },
    // ...
  ]
}

// Respuesta exitosa (200 OK)
{
  "success": true,
  "message": "Chapters reordered successfully"
}
```

### Notificaciones

Se utiliza Sonner para mostrar notificaciones al usuario:

```typescript
import { toast } from 'sonner';

// Notificación de éxito
toast.success('Operación exitosa', {
  style: {
    background: '#ecfdf5',
    color: '#047857',
    border: '1px solid #a7f3d0',
    borderRadius: '0.5rem',
    fontWeight: 500,
  }
});

// Notificación de error
toast.error('Error en la operación', {
  style: {
    background: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
    fontWeight: 500,
  }
});
```

### Estilos y Temas

La aplicación utiliza Tailwind CSS con los siguientes colores principales:

- **Primarios**:
  - Indigo: `from-indigo-500 to-violet-500` para elementos principales
  - Verde: `from-emerald-500 to-teal-500` para acciones positivas
  - Rojo: `text-rose-600` para acciones de advertencia o peligro

- **Fondos**:
  - Gradiente sutil: `bg-gradient-to-br from-indigo-50 to-violet-50`
  - Tarjetas: `bg-white/80` con sombras suaves

- **Tipografía**:
  - Principal: Inter (configurado en `tailwind.config.js`)
  - Tamaños y pesos consistentes en toda la aplicación

#### Implementación

El componente `CourseImage` maneja la interfaz de usuario para la carga de imágenes:

```tsx
// Ejemplo del componente CourseImage
const CourseImage = ({ idCourse, imageCourse }) => {
  const [image, setImage] = useState(imageCourse);
  
  const onChangeImage = async (imageURL: string) => {
    try {
      await axios.patch(`/api/course/${idCourse}`, {
        imageURL: imageURL
      });
      // Mostrar notificación de éxito
    } catch (error) {
      // Manejar errores
    }
  };

  return (
    <div>
      {/* Interfaz de usuario */}
    </div>
  );
};
```

#### Configuración del Backend

El endpoint de la API para actualizar la imagen del curso:

```typescript
// app/api/course/[courseId]/route.ts
export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const { imageURL } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.update({
      where: { id: courseId, userId },
      data: { imageURL }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error updating course image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
```

#### Configuración de UploadThing

1. Crear una cuenta en [UploadThing](https://uploadthing.com/)
2. Configurar las variables de entorno:
   ```env
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   ```
3. Configurar los tipos de archivo permitidos y tamaños máximos

#### Solución de Problemas Comunes

- **Imagen no se guarda**: Verificar que el campo se llame exactamente `imageURL`
- **Permisos denegados**: Asegurarse que el usuario sea el propietario del curso
- **Errores de validación**: Revisar la consola del navegador para mensajes de error

### Eliminación de Cursos

Los cursos pueden ser eliminados con confirmación previa:

```tsx
const deleteCourse = async () => {
  try {
    await axios.delete(`/api/course/${courseId}`);
    toast("Course deleted successfully");
    router.refresh();
  } catch (error) {
    console.error("Error deleting course:", error);
    toast.error("Failed to delete course");
  }
};
```

## Gestión de Progreso del Estudiante

### Componente ProgressCourse
Muestra el progreso de un estudiante en un curso específico.

**Características:**
- Muestra una barra de progreso visual
- Indica el porcentaje completado
- Maneja estados para cursos gratuitos y de pago
- Se integra con el sistema de autenticación de Clerk

**Uso:**
```tsx
<ProgressCourse 
  courseId={course.id} 
  totalChapters={course.chapters.length} 
  price={course.price} 
/>
```

### Componente InfoCourse
Muestra la información detallada de un capítulo y controla el acceso al contenido.

**Características:**
- Bloquea el contenido si el curso no ha sido comprado
- Muestra un mensaje de bloqueo con icono
- Integra el reproductor de video para el contenido del capítulo

### Componente VideoCourse
Reproductor de video integrado para los contenidos del curso.

**Características:**
- Soporte para URLs de video
- Controles de reproducción estándar
- Diseño responsivo

### Funcionalidad de Progreso
- Seguimiento del progreso por capítulo
- Actualización en tiempo real del estado de finalización
- Cálculo automático del porcentaje completado

### Control de Acceso
- Verificación de compra del curso
- Redirección automática si no se cumplen los requisitos
- Mensajes de error claros para el usuario

## Panel del Profesor

El panel del profesor proporciona una interfaz centralizada para gestionar todos los aspectos de los cursos.

### Vista General

- Listado de todos los cursos del profesor
- Acciones rápidas para cada curso (editar, eliminar)
- Estado de publicación de cada curso

### Navegación

- Acceso rápido a la creación de nuevos cursos
- Filtrado y búsqueda de cursos
- Navegación entre diferentes secciones del panel

## API Routes y Server Actions

### API de Cursos

#### Endpoints Principales

- `POST /api/course`: Crear un nuevo curso
- `GET /api/course`: Obtener todos los cursos
- `GET /api/course/:id`: Obtener un curso específico
- `PATCH /api/course/:id`: Actualizar un curso
- `DELETE /api/course/:id`: Eliminar un curso

#### Endpoints de Capítulos

- `POST /api/course/:courseId/chapter`: Crear un nuevo capítulo
- `PATCH /api/course/:courseId/chapter/:chapterId`: Actualizar un capítulo
- `DELETE /api/course/:courseId/chapter/:chapterId`: Eliminar un capítulo
- `PATCH /api/course/:courseId/chapter/:chapterId/publish`: Publicar/despublicar un capítulo
- `PUT /api/course/:courseId/chapter/reorder`: Reordenar capítulos

### API de Analytics

La API de analytics proporciona endpoints para obtener datos estadísticos:

- `GET /api/analytics/totalSuscriptors`: Obtiene el número de suscriptores por mes
- `GET /api/analytics/revenueByMonth`: Obtiene los ingresos mensuales

### API de Progreso

- `GET /api/get-user-progress/:courseId`: Obtiene el progreso del usuario en un curso
- `PUT /api/get-user-progress`: Actualiza el progreso del usuario

### API de Pagos

- `POST /api/webhook`: Webhook para procesar eventos de Stripe

### Server Actions

Los Server Actions son funciones que se ejecutan en el servidor y permiten operaciones directas con la base de datos:

- `getHomeCourses`: Obtiene los cursos para la página principal
- `getCourseBySlug`: Busca un curso por su slug
- `getUserProgress`: Obtiene el progreso de un usuario
- `getLastPurchases`: Obtiene las últimas transacciones
- `getRevenueByMonth`: Calcula los ingresos mensuales
- `getSuscribersByMonth`: Obtiene los suscriptores mensuales

## Analytics y Reporting

El módulo de analytics proporciona visualización de datos clave para los profesores:

### Componentes Principales

#### SubscriptorsChart

Muestra las suscripciones mensuales en un gráfico de barras:
- Visualiza los últimos 4 meses de datos
- Utiliza efectos visuales modernos como gradientes y animaciones
- Muestra indicadores de crecimiento porcentual
- Estilizado con Tailwind CSS y variables CSS personalizadas
- Implementado con Recharts para renderizar un BarChart interactivo

```tsx
// Ejemplo de implementación (simplificado):
<ResponsiveContainer width="100%" height={350}>  
  <BarChart data={data}>  
    <XAxis dataKey="name" />  
    <YAxis />  
    <Tooltip content={<ChartTooltip />} />  
    <Bar 
      dataKey="count" 
      radius={[4, 4, 0, 0]} 
      className="fill-[oklch(var(--chart-1))]" 
    />  
  </BarChart>  
</ResponsiveContainer>
```

#### TotalRevenue

Visualiza los ingresos mensuales en un gráfico de líneas:
- Permite ver la tendencia de ingresos de los últimos 4 meses
- Muestra el total acumulado y el porcentaje de crecimiento
- Utiliza colores en notación oklch para mayor consistencia
- Incluye tooltips personalizados al hacer hover sobre los puntos de datos
- Usa efecto de degradado bajo la línea para destacar la tendencia

```tsx
// Ejemplo de implementación (simplificado):
<ResponsiveContainer width="100%" height={350}>  
  <LineChart data={data}>  
    <XAxis dataKey="month" />  
    <YAxis />  
    <Tooltip content={<ChartTooltip />} />  
    <Line 
      type="monotone" 
      dataKey="revenue" 
      stroke="oklch(0.67 0.15 250)" 
      strokeWidth={2}
      dot={{ fill: "oklch(0.67 0.15 250)" }} 
    />  
  </LineChart>  
</ResponsiveContainer>
```

#### Payments

Tabla de transacciones recientes:
- Interfaz con filtrado por correo electrónico
- Diseño moderno con efectos hover y estilos consistentes
- Muestra detalles de cada compra como usuario, curso y monto
- Implementada con TanStack Table para manejo eficiente de datos
- Incluye estados de carga y mensajes cuando no hay resultados

```tsx
// Ejemplo de columnas configuradas:
const columns = [
  {
    accessorKey: "userEmail",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[oklch(var(--chart-1))]" />
          {row.original.userEmail}
        </div>
      );
    },
  },
  // Otras columnas...
];
```

### Actions (Server Actions)

- `getSuscribersByMonth`: Consulta el número de suscripciones agrupadas por mes
  - Utiliza Prisma para consultar la tabla Purchase
  - Agrupa los resultados por mes
  - Retorna datos formateados para los últimos 4 meses

- `getRevenueByMonth`: Calcula los ingresos mensuales de las compras
  - Consulta todas las compras en un período
  - Suma los precios por mes
  - Calcula tendencias y crecimientos

- `getLastPurchases`: Obtiene las transacciones más recientes con detalles
  - Incluye datos del usuario y curso para cada compra
  - Ordenadas por fecha (más recientes primero)
  - Con formato para mostrar en la tabla de pagos

### Estilos y UI

Los componentes de analytics utilizan:
- Notación de color `oklch()` para mayor consistencia visual
- Variables CSS personalizadas definidas en `globals.css`
- Efectos de glassmorphism con `backdrop-blur` y gradientes
- Animaciones suaves para mejorar la experiencia de usuario
- Tarjetas con bordes sutiles y sombras para profundidad
- Consistencia visual mediante componentes Card de la UI

## Flujo de Trabajo del Profesor

1. **Creación de Curso**
   - Rellenar formulario de creación
   - Configurar ajustes básicos
   - Guardar curso

2. **Edición de Contenido**
   - Subir imagen del curso
   - Añadir descripción y detalles
   - Configurar precio y categoría

3. **Gestión de Capítulos**
   - Crear y ordenar capítulos
   - Subir contenido de video
   - Configurar capítulos gratuitos

4. **Publicación**
   - Revisar contenido
   - Cambiar estado a "Publicado"
   - Gestionar visibilidad

5. **Monitoreo de Rendimiento**
   - Revisar estadísticas de suscripciones
   - Analizar ingresos por curso
   - Seguir las transacciones recientes

## Integración con Stripe

### Configuración

1. **Variables de entorno necesarias** en `.env`:
   ```env
   STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_clave_publica_de_stripe
   STRIPE_WEBHOOK_SECRET=tu_secreto_de_webhook
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

2. **Instalación de dependencias**:
   ```bash
   npm install stripe @stripe/stripe-js
   # o
   yarn add stripe @stripe/stripe-js
   ```

### Desarrollo Local

1. **Instalar Stripe CLI**:
   ```bash
   npm install -g stripe-cli
   # o
   yarn global add stripe-cli
   ```

2. **Iniciar sesión**:
   ```bash
   stripe login
   ```

3. **Iniciar el listener de webhooks**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. **Scripts útiles en `package.json`**:
   ```json
   "scripts": {
     "dev": "next dev",
     "stripe:listen": "stripe listen --forward-to localhost:3000/api/webhook",
     "dev:all": "concurrently \"npm run dev\" \"npm run stripe:listen\""
   }
   ```

### Producción

1. Configura el webhook en el [Dashboard de Stripe](https://dashboard.stripe.com/webhooks)
2. Establece la URL de producción (ej: `https://tudominio.com/api/webhook`)
3. Asegúrate de que todas las variables de entorno estén configuradas en tu proveedor de hosting

### Flujo de Pago

1. El cliente inicia el checkout
2. Se crea una sesión de pago con Stripe
3. El cliente completa el pago
4. Stripe notifica a tu webhook
5. El webhook procesa el pago exitoso
6. Se registra la compra en la base de datos

## Seguridad

- Solo los usuarios autenticados pueden acceder al panel del profesor
- Los profesores solo pueden editar/eliminar sus propios cursos
- Validación de datos en el servidor con Zod
- Protección contra CSRF y XSS
- Rutas protegidas mediante middleware de autenticación de Clerk

## Sistema de Subida de Archivos

La plataforma utiliza UploadThing para la gestión de archivos, permitiendo:

- Subida de imágenes para cursos
- Almacenamiento seguro en la nube
- Previsualización de archivos
- Validación de tipos y tamaños

### Configuración de UploadThing

1. Configurar las variables de entorno:
   ```env
   UPLOADTHING_SECRET=tu_secreto_uploadthing
   UPLOADTHING_APP_ID=tu_app_id_uploadthing
   ```

2. Configurar el manejador de subidas en `app/api/uploadthing/core.ts`

## Próximas Mejoras

1. Implementar sistema de comentarios y valoraciones
2. Añadir foros de discusión
3. Integrar sistema de mensajería
4. Mejorar el panel de administración
5. Añadir más opciones de personalización de perfil
6. Implementar búsqueda avanzada de cursos
7. Añadir sistema de notificaciones en tiempo real
8. Mejorar la accesibilidad
9. Añadir modo oscuro
10. Implementar pruebas unitarias y de integración

## Guía de Estilo para Componentes

### Botones

- **Primario**:
  ```tsx
  <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
    Texto del botón
  </Button>
  ```

- **Secundario**:
  ```tsx
  <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
    Texto del botón
  </Button>
  ```

- **Peligro**:
  ```tsx
  <Button variant="outline" className="text-rose-600 border-rose-100 hover:bg-rose-50">
    Acción peligrosa
  </Button>
  ```

### Tarjetas

```tsx
<div className="p-6 bg-white/80 rounded-xl shadow-sm border border-slate-100">
  <h3 className="text-lg font-semibold text-slate-800 mb-2">Título</h3>
  <p className="text-slate-600">Contenido de la tarjeta</p>
</div>
```

### Formularios

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Título</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Ingrese un título"
              className="focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {/* Más campos del formulario */}
  </form>
</Form>
```
**Última actualización**: 3 de Junio de 2025
**Desarrollado por**: Daniel Sánchez Vázquez
