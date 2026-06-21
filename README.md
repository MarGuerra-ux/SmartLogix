# 🚚 SmartLogix

<p align="center">

Sistema Inteligente de Gestión Logística desarrollado como proyecto académico para la asignatura **Desarrollo Full Stack**.

El sistema centraliza la administración de pedidos, clientes, productos, transportistas y seguimiento logístico, incorporando una arquitectura modular basada en servicios, pruebas unitarias automatizadas e integración con tecnologías modernas como **React**, **Supabase**, **Google Maps** y **Vitest**.

</p>

---

## Estado del Proyecto

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![Google Maps](https://img.shields.io/badge/Google%20Maps-API-4285F4?logo=googlemaps)
![Coverage](https://img.shields.io/badge/Coverage-60%25-success)
![Status](https://img.shields.io/badge/Proyecto-Finalizado-success)

---

# Integrantes

| Nombre | Rol |
|---------|-----|
| **Marco Guerra** | Desarrollo Frontend · Arquitectura · Testing · Integración Google Maps · Diseño UI/UX |
| **Matías Vergara** | Desarrollo Backend · Persistencia · Servicios · Documentación |

---

# Descripción General

SmartLogix es una plataforma web diseñada para administrar el ciclo completo de un proceso logístico, desde el registro de clientes y productos hasta la gestión de pedidos y el seguimiento de envíos.

El proyecto fue construido siguiendo una arquitectura basada en componentes y servicios independientes, facilitando la mantenibilidad, escalabilidad y reutilización del código.

Entre sus principales funcionalidades destacan:

- Administración de clientes.
- Administración de productos.
- Gestión de pedidos.
- Gestión de transportistas.
- Gestión de bodegas.
- Seguimiento de envíos.
- Dashboard operativo.
- Integración con Google Maps.
- Persistencia mediante Supabase.
- Persistencia Mock para desarrollo y pruebas.
- Arquitectura desacoplada mediante servicios.
- Pruebas unitarias automatizadas.
- Reportes automáticos de cobertura.

---

# Objetivos del Proyecto

El principal objetivo de SmartLogix consiste en desarrollar una plataforma capaz de centralizar la operación logística de una empresa mediante una interfaz moderna, intuitiva y desacoplada.

Adicionalmente, el proyecto busca demostrar la aplicación de buenas prácticas de desarrollo de software mediante:

- Arquitectura modular.
- Separación por componentes.
- Desarrollo basado en servicios.
- Persistencia desacoplada.
- Testing automatizado.
- Cobertura de pruebas.
- Integración con APIs externas.
- Documentación técnica.

---

# Características Principales

- Dashboard administrativo.
- Gestión de pedidos.
- Gestión de clientes.
- Gestión de productos.
- Gestión de bodegas.
- Gestión de transportistas.
- Seguimiento de pedidos.
- Integración con Google Maps.
- Simulación de flota logística.
- Arquitectura desacoplada.
- Persistencia híbrida.
- Pruebas unitarias automatizadas.
- Reportes PDF automáticos.
- Cobertura de código mediante Vitest.

---

# Índice

1. Arquitectura del Sistema
2. Tecnologías Utilizadas
3. APIs Integradas
4. Persistencia de Datos
5. Estructura del Proyecto
6. Instalación
7. Variables de Entorno
8. Ejecución del Proyecto
9. Servicios Implementados
10. Pruebas Unitarias
11. Cobertura de Código
12. Generación de Reportes
13. Flujo del Sistema
14. Capturas del Proyecto
15. Futuras Mejoras
16. Créditos

---

# Arquitectura del Sistema

SmartLogix fue desarrollado siguiendo una arquitectura modular basada en componentes, servicios y capas de persistencia desacopladas. Esta estructura permite mantener el proyecto organizado, facilitar futuras ampliaciones y reducir el acoplamiento entre los distintos módulos de la aplicación.

La arquitectura implementada busca separar claramente la lógica de negocio, la presentación de datos y el acceso a la información, permitiendo que cada componente tenga una única responsabilidad.

---

## Arquitectura General

```text
                        SmartLogix

                             │
                             │
                    React + Vite Frontend
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        │                    │                    │
   Componentes          Servicios            Hooks
        │                    │                    │
        └──────────────┬─────┴──────────────┬─────┘
                       │                    │
                 Persistencia         Simulación
                 (Supabase)          (Tracking)
                       │                    │
                       └────────────┬───────┘
                                    │
                             Google Maps API
```

---

## Arquitectura por Capas

La aplicación se encuentra dividida en distintas capas funcionales.

### Capa de Presentación

Corresponde a todos los componentes React encargados de representar la interfaz gráfica del sistema.

Entre ellos destacan:

- Dashboard
- Gestión de Clientes
- Gestión de Productos
- Gestión de Pedidos
- Gestión de Transportistas
- Gestión de Tracking
- Componentes reutilizables
- Componentes de mapas

La capa de presentación no accede directamente a la base de datos, sino que consume servicios especializados.

---

### Capa de Servicios

Toda la lógica relacionada con el acceso a datos se encuentra encapsulada en servicios independientes.

Cada módulo posee su propio servicio, por ejemplo:

- customerService
- orderService
- productService
- warehouseService
- carrierService
- trackingService

Gracias a esta separación, los componentes React permanecen desacoplados del mecanismo de persistencia utilizado.

---

### Capa de Persistencia

El proyecto utiliza un modelo híbrido de persistencia compuesto por dos mecanismos.

#### Persistencia Real

Utiliza Supabase como Backend as a Service (BaaS), permitiendo acceder a información almacenada en una base de datos PostgreSQL mediante APIs REST generadas automáticamente.

Esta capa es utilizada cuando el proyecto trabaja con datos reales.

---

#### Persistencia Simulada (Mocks)

Durante el desarrollo y la ejecución de pruebas unitarias se utilizaron archivos Mock.

Estos permiten desacoplar completamente la lógica del sistema respecto de la base de datos.

Las principales ventajas de utilizar Mocks son:

- Mayor velocidad durante el desarrollo.
- Independencia del estado de la base de datos.
- Resultados repetibles.
- Facilidad para probar escenarios específicos.
- Reducción de dependencias externas.

---

### Integración con Google Maps

El módulo Tracking utiliza la Google Maps JavaScript API para representar visualmente la ubicación de los transportistas.

Actualmente el proyecto implementa:

- Mapa global de seguimiento.
- Marcadores dinámicos.
- Seguimiento individual por pedido.
- Integración preparada para datos GPS reales.
- Arquitectura preparada para futuras rutas reales.

La simulación implementada permite visualizar una flota en movimiento, entregando una representación visual del estado operacional del sistema.

---

### Motor de Simulación

Con el objetivo de representar un sistema logístico activo, se implementó un pequeño motor de simulación encargado de generar el desplazamiento de los transportistas sobre el mapa.

Este motor administra:

- Generación inicial de transportistas.
- Actualización automática de posiciones.
- Simulación de desplazamiento.
- Movimiento independiente de cada vehículo.
- Actualización periódica mediante Hooks de React.

Esta aproximación permite demostrar visualmente el funcionamiento del módulo de seguimiento sin depender de servicios GPS reales.

---

## Principios de Diseño Utilizados

Durante el desarrollo se aplicaron diversos principios orientados a obtener un software mantenible.

Entre ellos destacan:

- Separación de responsabilidades.
- Componentes reutilizables.
- Arquitectura modular.
- Bajo acoplamiento.
- Alta cohesión.
- Reutilización de servicios.
- Configuración centralizada.
- Escalabilidad.
- Facilidad de mantenimiento.

---

## Flujo General del Sistema

```text
Usuario

   │

   ▼

Interfaz React

   │

   ▼

Servicio correspondiente

   │

   ├──────────────► Mock

   │

   └──────────────► Supabase

                         │

                         ▼

                  Datos obtenidos

                         │

                         ▼

                Actualización UI

                         │

                         ▼

               Visualización final
```

---

La estructura adoptada permite reemplazar o extender cualquiera de las capas sin afectar significativamente al resto de la aplicación, facilitando futuras integraciones como autenticación, notificaciones, geolocalización en tiempo real o nuevos proveedores logísticos.

---

# Tecnologías Utilizadas

SmartLogix fue desarrollado utilizando un conjunto de tecnologías modernas orientadas al desarrollo de aplicaciones web escalables, modulares y de fácil mantenimiento.

Cada tecnología fue seleccionada considerando aspectos como rendimiento, facilidad de integración, disponibilidad de documentación y compatibilidad con el resto del ecosistema utilizado durante el desarrollo.

---

# Frontend

## React 19

React fue utilizado como biblioteca principal para el desarrollo de toda la interfaz de usuario.

Su arquitectura basada en componentes permitió dividir la aplicación en módulos independientes, facilitando la reutilización del código y la mantenibilidad del proyecto.

### Principales ventajas

- Arquitectura basada en componentes.
- Reutilización de interfaces.
- Actualización eficiente mediante Virtual DOM.
- Ecosistema ampliamente utilizado.
- Excelente integración con herramientas modernas.

React constituye el núcleo de toda la interfaz de SmartLogix.

---

## Vite

Vite fue utilizado como herramienta de construcción (Build Tool) y servidor de desarrollo.

Su principal ventaja es ofrecer tiempos de compilación extremadamente rápidos gracias al uso de módulos ES nativos.

### Funciones dentro del proyecto

- Servidor de desarrollo.
- Compilación del proyecto.
- Optimización de recursos.
- Gestión de variables de entorno.
- Generación del Build de producción.

---

## React Router DOM

Se utilizó React Router para administrar toda la navegación entre los distintos módulos del sistema.

Permite implementar una aplicación SPA (Single Page Application), evitando recargas completas del navegador.

Entre las principales vistas implementadas se encuentran:

- Dashboard
- Clientes
- Productos
- Pedidos
- Transportistas
- Tracking
- Configuración

---

# Backend y Persistencia

## Supabase

Supabase fue seleccionado como plataforma Backend as a Service (BaaS).

Su utilización permitió implementar persistencia real sin necesidad de desarrollar un servidor propio.

El proyecto utiliza Supabase como proveedor de:

- Base de datos PostgreSQL.
- API REST automática.
- Gestión centralizada de información.

### Ventajas

- Integración sencilla.
- Alto rendimiento.
- Escalabilidad.
- Base de datos PostgreSQL.
- APIs automáticas.

---

## Persistencia Mock

Durante el desarrollo y las pruebas unitarias se implementó una capa Mock.

Esta capa simula el comportamiento de la base de datos utilizando estructuras de datos locales.

Su utilización permitió:

- Ejecutar pruebas sin depender de Supabase.
- Reducir tiempos de desarrollo.
- Generar escenarios de prueba controlados.
- Evitar modificaciones accidentales sobre datos reales.

La arquitectura implementada permite cambiar entre Supabase y Mock sin modificar la interfaz gráfica.

---

# Integración de Mapas

## Google Maps JavaScript API

El módulo Tracking utiliza Google Maps JavaScript API como plataforma de visualización geográfica.

Actualmente se implementan las siguientes funcionalidades:

- Mapa principal del Dashboard.
- Seguimiento individual de pedidos.
- Marcadores dinámicos.
- Zoom interactivo.
- Navegación libre.
- Visualización de flota simulada.

La arquitectura quedó preparada para futuras integraciones con servicios GPS reales.

---

# Testing

## Vitest

Vitest fue utilizado como framework principal para la ejecución de pruebas unitarias.

Permite validar de forma automática el correcto funcionamiento de los servicios implementados.

Entre sus ventajas destacan:

- Alta velocidad.
- Integración nativa con Vite.
- Reportes automáticos.
- Cobertura de código.
- Compatibilidad con React Testing Library.

---

## React Testing Library

Esta biblioteca fue utilizada para realizar pruebas sobre componentes React simulando el comportamiento de un usuario real.

Permite verificar:

- Renderizado correcto.
- Eventos.
- Interacciones.
- Estados de componentes.

---

## Coverage V8

Se utilizó el proveedor Coverage V8 para generar reportes automáticos de cobertura del código.

Esto permitió conocer qué porcentaje de la aplicación se encuentra validado mediante pruebas unitarias.

Los reportes incluyen:

- Statements.
- Branches.
- Functions.
- Lines.

---

# Generación de Reportes

## Puppeteer

Puppeteer fue utilizado para automatizar la generación de reportes en formato PDF.

Su utilización permitió convertir automáticamente los resultados obtenidos durante la ejecución de las pruebas en documentos listos para ser entregados.

---

## HTML2PDF

La librería HTML2PDF fue utilizada para convertir contenido HTML en documentos PDF manteniendo el formato visual generado por el sistema.

Esta herramienta complementa el proceso automatizado de generación de reportes.

---

# Calidad del Código

Durante el desarrollo también se utilizaron herramientas destinadas a mejorar la calidad del software.

## ESLint

Se implementó ESLint para detectar errores de programación y mantener un estilo de código consistente en todo el proyecto.

Su utilización permitió:

- Detectar errores antes de ejecutar la aplicación.
- Uniformar el estilo de desarrollo.
- Reducir errores comunes.
- Mejorar la mantenibilidad.

---

# Variables de Entorno

La configuración sensible del proyecto fue almacenada mediante variables de entorno utilizando archivos `.env`.

Entre ellas destacan:

- API Key de Google Maps.
- Configuración de Supabase.
- Parámetros de conexión.

Esta práctica evita exponer información sensible dentro del código fuente.

---

# Resumen Tecnológico

| Tecnología | Función Principal |
|------------|------------------|
| React | Desarrollo de la interfaz de usuario |
| Vite | Compilación y servidor de desarrollo |
| React Router DOM | Navegación entre módulos |
| Supabase | Persistencia de datos |
| Google Maps JavaScript API | Visualización geográfica |
| Vitest | Pruebas unitarias |
| React Testing Library | Pruebas de componentes |
| Coverage V8 | Cobertura del código |
| Puppeteer | Generación automática de reportes PDF |
| HTML2PDF | Conversión de HTML a PDF |
| ESLint | Calidad y estandarización del código |

---

La combinación de estas tecnologías permitió desarrollar una aplicación moderna, modular y preparada para futuras ampliaciones, siguiendo buenas prácticas de ingeniería de software y asegurando un alto nivel de mantenibilidad.

# Persistencia de Datos

Uno de los principales objetivos durante el desarrollo de SmartLogix fue diseñar una arquitectura que permitiera desacoplar completamente la lógica de negocio del mecanismo de almacenamiento de datos.

Para lograr este objetivo se implementó un modelo de persistencia híbrido compuesto por dos capas independientes:

- Persistencia Real mediante Supabase.
- Persistencia Simulada mediante Mock Services.

Esta estrategia permitió trabajar con información real cuando era necesario y, al mismo tiempo, disponer de un entorno completamente controlado para el desarrollo y la ejecución de pruebas unitarias.

---

# Arquitectura de Persistencia

```text
                     COMPONENTES REACT

                             │

                             ▼

                      CAPA DE SERVICIOS

                             │

          ┌──────────────────┴──────────────────┐

          │                                     │

          ▼                                     ▼

    Mock Services                         Supabase

          │                                     │

          ▼                                     ▼

 Datos Simulados                     Base de Datos PostgreSQL
```

---

# Persistencia mediante Supabase

Supabase corresponde a la plataforma utilizada como Backend as a Service (BaaS).

Esta plataforma proporciona una base de datos PostgreSQL junto con una API REST generada automáticamente, permitiendo acceder a la información sin necesidad de desarrollar un servidor propio.

Dentro del proyecto SmartLogix, Supabase es utilizado para almacenar la información permanente del sistema.

Entre los principales módulos persistidos se encuentran:

- Clientes.
- Productos.
- Pedidos.
- Transportistas.
- Bodegas.
- Usuarios.
- Configuración.

---

## Ventajas de utilizar Supabase

- Base de datos PostgreSQL administrada.
- API REST automática.
- Escalabilidad.
- Alto rendimiento.
- Fácil integración con React.
- Administración centralizada de datos.
- Seguridad mediante autenticación integrada.
- Baja complejidad de mantenimiento.

---

# Persistencia mediante Mock Services

Durante el desarrollo del proyecto se implementó una segunda capa de persistencia basada en servicios Mock.

Estos servicios reemplazan temporalmente el acceso a la base de datos utilizando estructuras de datos almacenadas localmente.

Su principal objetivo consiste en permitir el desarrollo independiente del estado de la base de datos y facilitar la ejecución de pruebas automatizadas.

Cada servicio Mock devuelve estructuras equivalentes a las obtenidas desde Supabase, permitiendo que el resto de la aplicación funcione sin modificaciones.

---

## Ventajas de utilizar Mock Services

La utilización de Mock Services entrega múltiples beneficios durante el ciclo de desarrollo.

Entre ellos destacan:

- Desarrollo sin conexión permanente a la base de datos.
- Eliminación de dependencias externas.
- Mayor velocidad de ejecución.
- Escenarios completamente controlados.
- Datos repetibles.
- Facilidad para reproducir errores.
- Mayor estabilidad durante las pruebas.
- Menor riesgo de modificar datos reales.

---

# Flujo de Persistencia

El funcionamiento general del sistema puede resumirse mediante el siguiente flujo:

```text
Usuario

    │

    ▼

Componente React

    │

    ▼

Servicio correspondiente

    │

    ├────────────► Mock Service

    │

    └────────────► Supabase

                     │

                     ▼

             Datos obtenidos

                     │

                     ▼

      Actualización de la interfaz
```

Esta arquitectura permite modificar la fuente de datos sin alterar los componentes visuales de la aplicación.

---

# Desacoplamiento entre Componentes y Persistencia

Uno de los principios utilizados durante el desarrollo fue mantener completamente desacoplada la interfaz de usuario respecto del mecanismo de persistencia.

Los componentes React nunca realizan consultas directas a la base de datos.

En su lugar, consumen exclusivamente servicios especializados.

Por ejemplo:

```text
TrackingPage

        │

        ▼

trackingService

        │

        ▼

Mock o Supabase
```

Este diseño permite reemplazar la implementación interna del servicio sin afectar al resto del sistema.

---

# Beneficios para las Pruebas Unitarias

La existencia de una capa Mock permitió desarrollar pruebas unitarias completamente independientes de la infraestructura externa.

Gracias a ello fue posible:

- Ejecutar pruebas sin conexión a Internet.
- Eliminar la dependencia de Supabase durante los tests.
- Controlar completamente los datos utilizados.
- Obtener resultados consistentes entre ejecuciones.
- Reducir significativamente los tiempos de prueba.

Esta estrategia constituye una práctica ampliamente utilizada en proyectos profesionales debido a la estabilidad y confiabilidad que proporciona al proceso de testing.

---

# Escalabilidad

La arquitectura implementada permite incorporar nuevas fuentes de datos sin modificar la lógica de la aplicación.

En futuras versiones sería posible integrar:

- APIs REST externas.
- Microservicios.
- Servicios SOAP.
- Firebase.
- Bases de datos SQL adicionales.
- Bases de datos NoSQL.
- Sistemas ERP.
- Sistemas WMS.
- Sistemas TMS.

Todo ello reutilizando la misma interfaz de usuario y la misma capa de componentes.

---

# Conclusiones

La implementación de una arquitectura híbrida de persistencia permitió separar completamente la lógica de negocio del mecanismo de almacenamiento de datos.

Esta decisión simplificó considerablemente el desarrollo, facilitó la construcción de pruebas unitarias y dejó preparada la aplicación para futuras integraciones con servicios reales sin necesidad de rediseñar la arquitectura existente.

El resultado es una aplicación más mantenible, escalable y alineada con buenas prácticas de ingeniería de software utilizadas actualmente en proyectos profesionales.
