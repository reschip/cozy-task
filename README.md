# 🐸 CozyTasks

**CozyTasks** es un planificador minimalista de escritorio desarrollado con **Tauri v2, Rust y React**, diseñado para vivir silenciosamente en tu Mac, ofreciéndote un rincón pacífico y estético para vaciar tus tareas, eventos e ideas sin fricciones.

## ✨ Funcionalidades Principales

### 🖥️ Interfaz y Experiencia de Usuario (UI/UX)
- **Aesthetic "Cozy" Minimalista**: Construido con Vanilla CSS, tipografía suave (*Quicksand*) y una armoniosa paleta de colores pasteles que invita a la concentración y a la calma.
- **Modo Oscuro Integrado**: Se conecta de forma nativa a la configuración de tu sistema (Día/Noche). Si tu Mac cambia a Dark Mode, la aplicación responderá inmediatamente transformándose hacia una paleta Charcoal elegante con fondos oscuros sin requerir reinicios.
- **Formato Vertical (Widget Lock)**: Adiós al desorden de redimensionamiento. La ventana principal tiene una resolución inamovible de `380x700` pixeles para actuar como una impecable e inquebrantable agenda lateral.

### ⚙️ Integración Sistémica (Magia en Rust)
- **System Tray App**: Ejecución invisible. CozyTasks no estorba en tu Dock. Vive disimuladamente en tu barra de herramientas superior (Status Bar) representado con su ícono característico de Ranita.
- **Global Hotkey (Modo Ninja)**: Puedes invocar u ocultar el planificador al instante con el comando **`Cmd + Shift + T`** sin importar si estás en Safari, Photoshop o VSCode.
- **Auto-Start Silencioso**: Configuraciones instaladas en el agente de lanzamiento de macOS. La app cobra vida junto con tu computadora sin interrumpirte.
- **Persistencia de Datos Automática**: Archivos que se serializan automáticamente en la carpeta base nativa de OS `App Data` como un `data.json`. ¡Nada se pierde al cerrar la ventana!

### 📝 Módulos de Productividad
1. **Mis Tareas (Tasks)**:
   - Mecánica de 3 pasos circular con la casilla de verificación (Checkbox):
     - *Paso 1 (Blanco)*: Tarea pendiente.
     - *Paso 2 (Punto Amarillo Pastel)*: Tarea en progreso (*In Progress*).
     - *Paso 3 (Acierto Verde Menta)*: Tarea finalizada y oculta en gris.
2. **Mis Eventos (Events)**:
   - Seguimiento ágil de fechas importantes. Introduce título y calendario, renderizado visual a modo de un pequeño tablero.
3. **Mis Ideas (Ideas)**:
   - Para no quebrar el flujo de trabajo: suelta la idea, presiona Enter, y el sistema te guardará el "Brain Dump" en tarjetas de notas (tipo *post-it*) con vivos y bordes aleatorios pasteles.

## 🛠️ Stack Tecnológico
- **Frontend**: React (TypeScript) + Vite
- **Estilos**: Vanilla CSS puro (Variables CSS y animaciones Custom).
- **Backend / Core**: Rust
- **Framework Nativo**: Tauri v2
- **Plugins Nativos**: `tauri-plugin-autostart`, `tauri-plugin-global-shortcut`, `tauri-plugin-tray-icon`.

## 🌎 Compatibilidad Multi-Plataforma (Cross-Platform)
A pesar de ser una aplicación puramente nativa, su núcleo en Rust está escrito con **banderas condicionales** `#[cfg(target_os = ...)]`, lo que garantiza que:
- **Windows**: El atajo global se adapta a `Ctrl + Shift + T` y el auto-start utiliza el Registro de Windows en lugar de los agentes de Mac. Las tareas se guardan transparentemente en la ruta nativa de Windows `%APPDATA%`.
- **macOS**: Utiliza APIs exclusivas de Apple para el "App Dock" (permaneciendo oculto) y funciona a base de `Cmd + Shift + T`.
- **Linux**: Funciona sin modificaciones utilizando atajos `Ctrl` y estándares nativos de directorios base (`~/.local/share`).

*💡 Nota sobre Exportación Web/Remota*: No precisas comprar o tener 3 computadoras físicas para generar los instaladores. La arquitectura del código está totalmente preparada para integrarse en un "Pipeline" gratuito de **GitHub Actions**. Al subirlo, GitHub presta máquinas virtuales para empaquetar en automático los archivos finales `.exe`, `.dmg` y `.deb` a partir de un solo click!

## 🚀 Cómo Desarrollar (Dev)

Si deseas compilar la aplicación localmente:
1. Instala node `npm` y `cargo` (Rust).
2. Clona el repositorio e instala dependencias del frontend: `npm install`
3. Ejecuta el emulador de escritorio y enciende los motores de Hot-Reloading de Rust:
```bash
npm run tauri dev
```
