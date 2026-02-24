# Tauri + Rust: Guía de Inicialización para Agentes e Inteligencias Artificiales

Esta guía documenta los pasos probados y las trampas comunes al inicializar proyectos con **Tauri v2 + Rust + React (TypeScript/Vite)** desde cero. Diseñada para otros LLMs o Agentes Autonómos trabajando en macOS o entornos UNIX estándar.

## 1. Comandos de Scaffold (Generación de Código)
Para evitar problemas interactivos (`stdin/stdout` prompts) durante la creación por parte de un agente de IA, utiliza siempre el siguiente flag:
```bash
npx -y create-tauri-app@latest . --manager npm --template react-ts -y
```
- `-y` en `npx` asegura la instalación silenciosa del paquete de andamiaje.
- `-y` al final o los argumentos de template pre-seleccionados evitan que la CLI de Tauri detenga la ejecución esperando inputs complejos.

Instalación de utilidades críticas:
Una vez scaffolds finalizados, instalar las dependencias de NPM:
```bash
npm install
```

## 2. Dependencias de Rust
En muchos casos, el agente requerirá estructurar los datos enviados o recibidos de Rust en JSON. Tauri necesita `serde`.
Añádelos explícitamente corriendo lo siguiente en `/src-tauri`:
```bash
# Nota: Como Agente, asegúrate de que 'cargo' está en el PATH de tu command_runner.
# Puede que necesites pre-hacer `source $HOME/.cargo/env` o `. ~/.cargo/env` para ejecutarlo silenciosamente.
. $HOME/.cargo/env && cargo add serde --features derive && cargo add serde_json
```

## 3. Trampas Comunes (Gotchas) en React + Tauri

### A. Fallo de Pantalla Blanca (Falta Global CSS)
Al reemplazar o rehacer componentes raíces, en el archivo principal generado por Vite (`src/main.tsx`), es **esencial** importar el layout global de CSS de la App explícitamente:
```tsx
import "./index.css"; // ¡NO OLVIDAR ESTO O LA INTERFAZ SALDRÁ EN BLANCO/SIN ESTILO!
```

### B. Fallo de Render en Datos Serde (Pantalla de la Muerte en React)
Cuando Rust inicializa un modelo de persistencia vacío usando `AppData::default()`, `serde_json::Value` se guardará como `null`.
```rust
// Si creas una persistencia de datos general que se manda vía invoke al WebView:
#[derive(Serialize, Deserialize, Default)]
pub struct AppData {
    tasks: serde_json::Value, // <- Exportará a "tasks": null
}
```
**CRÍTICO:** Cuando se lee en React, los agentes de IA **deben** añadir chequeos contra nulos y caer por defecto en arreglos vacíos `[]`. Si en React haces `null.map(x => ...)` el árbol en DOM colapsa inmediatamente resultando en un fondo de color liso sin ningún renderizado.

**El Patrón Recomendado:**
```tsx
const loadData = async () => {
    try {
      const res: any = await invoke('get_data');
      // ¡Aplicar "or logical operator" || [] es vital si un campo devuelve null!
      setData({
        tasks: res.tasks || [],
        events: res.events || [],
      });
    } catch (e) {
      console.error(e);
    }
};
```

## 4. Pruebas y Construcción
Para correr de forma confiable la UI usando la CLI de tauri (esto lanzará la app y abrirá el debugger WebView en caso necesario):
```bash
npm run tauri dev
```
Para verificar que el compilador de Rust no tiene errores de sintaxis o empaquetar nativamente:
```bash
npm run tauri build
```
*(Nota: El servidor de cargo bajará muchísimas dependencias la primera vez, el Agente debe estar preparado para monitorear una operación asincrónica prolongada (1-3 minutos)).*
