# Healthy Desserts

Prototipo web mobile-first para estudiantes, construido con HTML, CSS y JavaScript sin dependencias externas.

## Funcionalidades

- Tienda abierta sin necesidad de iniciar sesión.
- Flujo interactivo de personalización del postre.
- Menú inteligente con filtros y recomendaciones.
- Catálogo ampliado con postres peruanos y opciones saludables personalizables.
- Carrito con validación de aula/salón, registro del comprador (nombres, apellidos e ID) y confirmación del pedido.
- Panel admin para seguimiento de pedidos y catálogo.
- Persistencia local con `localStorage`.

## Estructura

- `index.html`: interfaz principal.
- `styles.css`: sistema visual mobile-first.
- `boot.js`: lógica de recomendaciones, carrito y admin.

## Uso

1. Abre `index.html` en el navegador.
2. Personaliza tu postre, agrega al carrito y confirma el pedido (se solicitarán nombres, apellidos e ID antes de finalizar).
3. Usa el botón "Admin" en la esquina superior para ver los pedidos.

## Validación

El campo de aula/salón acepta formatos como `G503`, `C201` y `K607`. El pago es presencial al recoger el pedido; no existe pasarela de pago.
