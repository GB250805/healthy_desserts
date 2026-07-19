# Pruebas — Healthy Desserts

## Prototipo de la solución

Aplicación web funcional (`index.html`, `boot.js`, `styles.css`) sin dependencias externas. El estudiante responde un cuestionario de 3 preguntas, recibe un postre recomendado, arma su carrito, registra sus datos y confirma el pedido. El administrador ingresa con contraseña, visualiza la cola de pedidos en tiempo real, marca cada pedido como entregado y consulta el historial de entregas. Los datos persisten en `localStorage`.

## Flujo principal

1. El estudiante abre la app y responde el personalizador (dieta, necesidad, formato).
2. Recibe un **match** recomendado basado en sus respuestas.
3. Explora el menú inteligente, filtra por categorías y agrega productos al carrito.
4. Ingresa su aula (válida contra `aulas.csv`) y confirma el pedido.
5. Completa un registro con nombres, apellidos, ID y celular.
6. Recibe un código de pedido y la opción de confirmar por WhatsApp.
7. El pedido aparece automáticamente en el panel de administración.
8. El administrador ve la cola activa, marca cada pedido como "Entregado" con un botón.
9. El contador "Entregas listas" se actualiza y al hacer clic muestra el historial completo.

## Nivel de fidelidad

**Alta fidelidad.** El prototipo es completamente funcional, con interfaz real (dark mode, glassmorphism, responsive), manejo de estados, persistencia en navegador, validaciones de formulario, bloqueo de acceso por intentos fallidos y lógica de negocio completa (recomendación por puntaje, filtros, carrito, cola de pedidos). No requiere backend ni base de datos externa.

## Hipótesis que permite validar

- Los estudiantes encuentran útil un **personalizador** que les recomiende un postre según sus preferencias.
- El **flujo sin cuenta** (solo datos básicos + aula) reduce la fricción y aumenta la tasa de conversión.
- Los estudiantes están dispuestos a **pagar en efectivo al recoger** el pedido (sin pasarela de pago).
- El **panel administrador con cola en tiempo real** es suficiente para gestionar pedidos sin un sistema complejo.
- Un **botón por pedido para marcar como entregado** agiliza el flujo de trabajo del vendedor.
- El **historial de entregas** ayuda a la rendición de cuentas y seguimiento de ventas.
- Los estudiantes prefieren **confirmar por WhatsApp** como canal de verificación.
- El modelo de **aulas como punto de entrega** es viable logísticamente dentro de la universidad.
