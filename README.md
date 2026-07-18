# Healthy Desserts

Prototipo web mobile-first para estudiantes, construido con HTML, CSS y JavaScript sin dependencias externas.

## Funcionalidades

- Tienda abierta sin necesidad de iniciar sesión.
- Flujo interactivo de personalización del postre (3 preguntas: dieta, necesidad, formato).
- Match inteligente que recomienda el postre ideal según las respuestas.
- Menú inteligente con filtros por categoría (Concentración, Keto, Vegano, etc.).
- Catálogo ampliado con postres peruanos y opciones saludables personalizables.
- Carrito con validación de aula/salón contra `aulas.csv`, registro del comprador (nombres, apellidos e ID) y confirmación del pedido.
- Panel admin con bloqueo temporal tras 5 intentos fallidos de contraseña.
- Persistencia local con `localStorage`.

## Estructura

- `index.html`: interfaz principal con todas las pantallas y modales.
- `styles.css`: sistema visual mobile-first (~900 líneas, sin framework).
- `boot.js`: toda la lógica en una IIFE (~1020 líneas).
- `aulas.csv`: códigos de aula válidos (UPAO), cargados vía `fetch`.
- `Data.csv`: documento de referencia — **no se usa en tiempo de ejecución**.

## Uso

1. Abre `index.html` en un navegador (requiere servidor HTTP local para cargar `aulas.csv`).
2. Responde las 3 preguntas del personalizador para obtener tu match recomendado.
3. Explora el menú inteligente, filtra por categoría y agrega productos al carrito.
4. En el carrito, selecciona un aula válida, completa tus datos (nombres, apellidos, ID) y confirma el pedido.
5. Usa el botón "Admin" en la esquina superior para ver los pedidos (contraseña: `123456789`).

## Validación

- Aula/salón: formato letra + 3 dígitos (ej. `G503`), validado contra `aulas.csv`.
- Nombres y apellidos: solo letras (incluyendo caracteres acentuados del español).
- ID estudiantil: exactamente 9 dígitos.
- Admin: contraseña `123456789`, bloqueo temporal tras 5 intentos fallidos (60s).
- Pago presencial al recoger el pedido; no existe pasarela de pago.

## Notas técnicas

- Sin build tools, sin dependencias, sin `package.json`.
- `aulas.csv` se carga vía `fetch` con `cache: 'no-store'`. Usar servidor HTTP local (ej. `npx serve .` o VS Code Live Server).
- Estado persistido en `localStorage` bajo la clave `healthy-desserts-clean-state-v1`.
- `Data.csv` es documento de referencia — el catálogo real está en `CATALOG` dentro de `boot.js`.
