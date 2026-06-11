# Healthy Desserts

Prototipo web mobile-first para estudiantes, construido con HTML, CSS y JavaScript sin dependencias externas.

## Funcionalidades

- Autenticación simulada para alumno y admin.
- Cambio obligatorio de contraseña en el primer acceso del alumno.
- Flujo interactivo de personalización del postre.
- Menú inteligente con filtros y recomendaciones.
- Carrito con validación de aula/salón.
- Panel admin para seguimiento de pedidos y catálogo.
- Persistencia local con `localStorage`.

## Credenciales de prueba

### Alumno
- Usuario: `000255928`
- Contraseña inicial: `000255928`

### Admin
- Usuario: `Admin`
- Contraseña: `Admin`

## Estructura

- `index.html`: interfaz principal.
- `styles.css`: sistema visual mobile-first.
- `app.js`: lógica de autenticación, recomendaciones, carrito y admin.

## Uso

1. Inicia sesión con una de las cuentas de prueba.
2. Si entras como alumno por primera vez, cambia la contraseña.
3. Personaliza tu postre, agrega al carrito y confirma el pedido.

## Validación

El campo de aula/salón acepta formatos como `G503`, `C201` y `K607`.
