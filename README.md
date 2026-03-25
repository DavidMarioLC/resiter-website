# Resiter Website

Sitio web corporativo para Resiter, desarrollado con tecnologías web estáticas (HTML5, CSS3, JavaScript).

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Páginas del Sitio](#páginas-del-sitio)
- [Arquitectura CSS](#arquitectura-css)
- [JavaScript](#javascript)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Recursos](#recursos)

## 🎯 Descripción

Sitio web corporativo multilingüe (Español/English) que presenta la información institucional, valores, historia, estructura organizacional e inversiones de Resiter. El proyecto está optimizado para rendimiento y mantenibilidad usando una arquitectura CSS modular y componentes JavaScript reutilizables.

## 📁 Estructura del Proyecto

```
resiter-website/
├── assets/
│   ├── css/
│   │   ├── base.css           # CSS Reset + estilos base
│   │   ├── components.css     # Componentes reutilizables
│   │   └── styles.css         # Punto de entrada CSS
│   ├── images/
│   │   ├── logo-resiter.png
│   │   ├── icon-*.png        # Iconos de servicios y valores
│   │   └── *.svg              # Decoraciones SVG
│   └── js/
│       └── scripts.js         # Lógica del sitio
├── componentes.html           # Guía de componentes
├── contacto.html             # Página de contacto
├── estructura.html           # Estructura organizacional
├── etica.html                # Código de ética
├── historia.html             # Historia e hitos
├── index.html                # Página principal
├── inversiones.html          # Cifras de inversiones
├── noticias.html             # Listado de noticias
├── proposito.html            # Propósito y valores
├── single-industrias.html    # Detalle industria
├── single-noticias.html      # Detalle noticia
├── single-paises.html        # Detalle país
└── sostenibilidad.html       # Sostenibilidad

```

## 🛠 Tecnologías

### Core

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modulares con arquitectura BEM
- **JavaScript (ES6+)**: Interactividad moderna

### Librerías Externas

- **[Tabby](https://github.com/cferdinandi/tabby)** v12.0.0 - Sistema de tabs ligero
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrusel responsive

### Fuentes

- **Google Fonts**: Montserrat (weights 100-900)

## 📄 Páginas del Sitio

### Navegación Principal

#### Quiénes Somos (Dropdown)

- **Propósito y Valores** (`proposito.html`) - Misión, visión y valores corporativos
- **Historia e Hitos** (`historia.html`) - Trayectoria y momentos clave
- **Estructura y Directorio** (`estructura.html`) - Organigrama y equipo directivo
- **Cifras de Inversiones** (`inversiones.html`) - Datos financieros y de inversión

#### Otras Secciones

- **Sostenibilidad** (`sostenibilidad.html`) - Iniciativas ambientales y sociales
- **Noticias** (`noticias.html`) - Actualizaciones corporativas
- **Trabaja con Nosotros** (enlace externo)
- **Contacto** (`contacto.html`) - Formulario y datos de contacto

### Páginas de Detalle

- `single-noticias.html` - Plantilla para artículos de noticias
- `single-industrias.html` - Plantilla para industrias
- `single-paises.html` - Plantilla para países

### Páginas de Utilidad

- `componentes.html` - Guía de componentes UI (librería interna)
- `menu2.html`, `menu2-bentogrid.html` - Alternativas de navegación
- `example.html` - Ejemplos y pruebas

## 🎨 Arquitectura CSS

### Estructura Modular

El CSS está organizado en tres capas importadas desde `styles.css`:

```css
@import url("./base.css");
@import url("./components.css");
```

#### 1. **base.css** - Fundamentos

- CSS Reset moderno (basado en Josh Comeau's Reset)
- Box-sizing universal
- Tipografía base (Montserrat)
- Comportamiento fluido de medios
- Scroll suave

#### 2. **components.css** - Componentes Reutilizables

Componentes siguiendo metodología BEM (Block Element Modifier):

```html
<!-- Ejemplo de nomenclatura BEM -->
<header class="header">
  <div class="header__container">
    <a href="#" class="header__logo-container">
      <img class="header__logo" />
    </a>
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item header__item--has-submenu">...</li>
      </ul>
    </nav>
  </div>
</header>
```

**Componentes principales:**

- Header con navegación responsive
- Menú hamburguesa para móviles
- Submenús dropdown
- Selector de idioma
- Tabs (Tabby)
- Carruseles (Embla)

### Convenciones CSS

- **BEM Naming**: `block__element--modifier`
- **Mobile First**: Media queries desde menor a mayor resolución
- **Custom Properties**: Variables CSS para temas y tokens de diseño
- **Smooth Scroll**: Navegación fluida entre secciones

## ⚙️ JavaScript

### Arquitectura

El archivo `scripts.js` sigue un patrón modular con:

1. **Event Delegation**: Un listener en `DOMContentLoaded`
2. **Inicialización Condicional**: Chequeo de existencia de librerías
3. **Separación de Responsabilidades**: Funciones puras para cada característica

### Funcionalidades Implementadas

#### 1. Sistema de Tabs (Tabby)

```javascript
if (typeof Tabby !== "undefined") {
  const tabsElement = document.querySelector("[data-tabs]");
  if (tabsElement) {
    new Tabby("[data-tabs]");
  }
}
```

#### 2. Carruseles (Embla Carousel)

- Control de navegación prev/next
- Estado de botones deshabilitados
- Eventos de scroll y reinicio
- Múltiples instancias en la misma página

#### 3. Menú Hamburguesa

- Toggle de navegación móvil
- Animaciones de apertura/cierre
- Accesibilidad (aria-labels)

## 🚀 Instalación

Este es un sitio estático que NO requiere proceso de build. Simplemente sirve los archivos.

### Opción 1: Servidor Local Simple

```bash
# Usando Python 3
python3 -m http.server 8000

# Usando Node.js (npx http-server)
npx http-server -p 8000

# Usando PHP
php -S localhost:8000
```

### Opción 2: Live Server (VS Code)

1. Instalar extensión **Live Server**
2. Click derecho en `index.html` > "Open with Live Server"

### Opción 3: Cualquier Servidor Web

Configurar document root en la carpeta del proyecto:

- Apache
- Nginx
- IIS

## 💻 Desarrollo

### Agregar Nueva Página

1. Duplicar una página existente similar
2. Actualizar contenido HTML
3. Agregar enlace en el menú de navegación (`index.html`)
4. Mantener estructura de clases BEM para consistencia

### Agregar Nuevo Componente

1. Definir en `components.css` siguiendo BEM:

   ```css
   .nuevo-componente {
   }
   .nuevo-componente__elemento {
   }
   .nuevo-componente--modificador {
   }
   ```

2. Si requiere JS, agregar en `scripts.js`:

   ```javascript
   // Dentro del DOMContentLoaded
   const nuevoComponente = document.querySelector(".nuevo-componente");
   if (nuevoComponente) {
     // Lógica aquí
   }
   ```

3. Documentar en `componentes.html`

### Modificar Estilos Base

- **NO modificar `base.css`** directamente (es el reset)
- Usar `components.css` para componentes globales
- Considerar variables CSS para valores reutilizables

### Optimización de Imágenes

```bash
# Comprimir imágenes PNG
pngquant assets/images/*.png

# Optimizar SVG
svgo assets/images/*.svg
```

## 📦 Recursos

### Documentación de Librerías

- [Tabby Documentation](https://github.com/cferdinandi/tabby)
- [Embla Carousel Docs](https://www.embla-carousel.com/api/)
- [BEM Methodology](https://en.bem.info/methodology/)

### Herramientas Recomendadas

- **VS Code**: Editor con Live Server
- **Chrome DevTools**: Debugging
- **Lighthouse**: Auditorías de performance
- **Can I Use**: Compatibilidad de features CSS/JS

### Assets

- **Fuentes**: [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)
- **Iconos**: Actualmente PNG, considerar migrar a SVG para mejor escalabilidad

---

## 📝 Notas Técnicas

### Browser Support

- Navegadores modernos (últimas 2 versiones)
- Chrome, Firefox, Safari, Edge
- **No soporta IE11** (usa features modernas)

### Performance

- Imports CSS en cascada (considerar bundling futuro)
- Imágenes sin optimización lazy loading
- JavaScript vanilla (sin frameworks pesados)

### Mejoras Futuras Sugeridas

1. **Build Process**: Integrar bundler (Vite/Parcel) para minificación
2. **Lazy Loading**: Implementar para imágenes below-the-fold
3. **Critical CSS**: Inlinear CSS crítico en `<head>`
4. **Service Worker**: PWA para offline support
5. **Internacionalización**: Sistema de i18n robusto en lugar de archivos duplicados
6. **Componentes**: Migrar a Web Components para mayor modularidad
7. **Testing**: Setup de tests E2E (Playwright/Cypress)

---

**Desarrollado para Resiter** | Sitio corporativo estático
