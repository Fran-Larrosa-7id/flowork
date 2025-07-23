# Testing Guide - Flowork

## 📋 Resumen de Pruebas

Este proyecto cuenta con una suite completa de pruebas unitarias con alta cobertura:

### 🎯 Cobertura Actual
- **Statements**: 92.1% (35/38)
- **Branches**: 100% (18/18)
- **Functions**: 88.88% (8/9)
- **Lines**: 91.89% (34/37)

### 📊 Total de Pruebas: **37 pruebas**

## 🚀 Comandos de Testing

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas con cobertura
```bash
npm run test:coverage
```

### Ejecutar pruebas en modo CI (headless)
```bash
npm run test:ci
```

## 📁 Estructura de Pruebas

### Componente App (`src/app/app.spec.ts`)
- ✅ Creación del componente
- ✅ Inicialización de propiedades
- ✅ Configuración de tema oscuro
- ✅ Manejo de localStorage
- ✅ Preferencias del sistema
- ✅ Manipulación de clases CSS
- ✅ Pruebas de integración

### Componente Login (`src/app/pages/login/login.spec.ts`)
- ✅ Creación del componente
- ✅ Validación de formularios
- ✅ Validación de email
- ✅ Validación de contraseña
- ✅ Manejo de estados de carga
- ✅ Procesamiento de envío de formulario
- ✅ Mensajes de error personalizados
- ✅ Casos extremos y edge cases
- ✅ Pruebas de integración

## 🧪 Tipos de Pruebas Implementadas

### 1. **Pruebas de Componente**
- Verificación de creación exitosa
- Inicialización de propiedades
- Ciclo de vida de componentes

### 2. **Pruebas de Funcionalidad**
- Métodos públicos y privados
- Lógica de negocio
- Manejo de estados

### 3. **Pruebas de Integración**
- Flujos completos de usuario
- Interacción entre métodos
- Comportamiento end-to-end

### 4. **Pruebas de Edge Cases**
- Manejo de valores nulos/undefined
- Comportamiento con datos inválidos
- Situaciones excepcionales

### 5. **Mocking y Stubbing**
- APIs del navegador (localStorage, matchMedia)
- Elementos del DOM
- Librerías externas (AOS)

## 📈 Reportes de Cobertura

### Ver reporte HTML
Los reportes se generan automáticamente en la carpeta `coverage/`:

```bash
# Abrir en navegador (Windows)
explorer.exe .\coverage\index.html

# Abrir en navegador (Mac/Linux)
open ./coverage/index.html
```

### Tipos de reporte generados
- **HTML**: Reporte visual interactivo
- **LCOV**: Para integración con herramientas CI/CD
- **Text**: Resumen en consola
- **Text-summary**: Resumen conciso

## 🔧 Configuración de Testing

### ⚙️ Configuración Especial para Apps Zoneless

Como Flowork utiliza **zoneless change detection** de Angular, fue necesario realizar configuraciones adicionales para que las pruebas funcionen correctamente:

#### 1. **Instalación de Zone.js para testing**
```bash
npm install zone.js --save-dev
```

#### 2. **Creación del archivo `polyfills.ts`**
```typescript
// src/polyfills.ts
import 'zone.js';          
import 'zone.js/testing';    
```

#### 3. **Configuración en `angular.json`**
Se agregó la referencia a polyfills en la sección de test:
```json
{
  "test": {
    "builder": "@angular/build:karma",
    "options": {
      "polyfills": ["src/polyfills.ts"],
      "tsConfig": "tsconfig.spec.json",
      // ... resto de configuración
    }
  }
}
```

#### 4. **Creación del `karma.conf.js`**
Configuración personalizada de Karma con reportes de cobertura:
```javascript
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' }, 
        { type: 'text-summary' },
        { type: 'lcov' },
        { type: 'text' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    browsers: ['Chrome'],
    restartOnFileChange: true
  });
};
```

> **💡 Nota Importante**: Esta configuración especial es necesaria porque las apps zoneless de Angular no cargan Zone.js por defecto, pero las herramientas de testing (Jasmine/Karma) aún dependen de Zone.js para funcionar correctamente.

### Karma Configuration (`karma.conf.js`)
- Framework: Jasmine
- Navegador: Chrome/ChromeHeadless
- Cobertura: Istanbul
- Reportes múltiples habilitados

### Angular Testing
- TestBed para configuración de módulos
- ComponentFixture para testing de componentes
- Spies y mocks de Jasmine
- Manejo de detección de cambios

## 🎯 Mejores Prácticas Implementadas

### 1. **Estructura de Pruebas**
```typescript
describe('ComponentName', () => {
  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange, Act, Assert
    });
  });
});
```

### 2. **Mocking Efectivo**
- Mock de APIs del navegador
- Simulación de comportamientos externos
- Aislamiento de unidades bajo prueba

### 3. **Casos de Prueba Completos**
- Happy path (flujo exitoso)
- Error scenarios (manejo de errores)
- Edge cases (casos límite)
- Integration flows (flujos integrados)

### 4. **Aserciones Descriptivas**
- Mensajes claros y específicos
- Verificación de estados antes y después
- Validación de interacciones

## 🏆 Beneficios Logrados

- ✅ **Alta Confiabilidad**: Detección temprana de bugs
- ✅ **Refactoring Seguro**: Cambios con confianza
- ✅ **Documentación Viva**: Las pruebas documentan el comportamiento
- ✅ **Calidad del Código**: Código más mantenible y robusto
- ✅ **CI/CD Ready**: Listo para integración continua

## 🔍 Análisis de Cobertura

### Áreas con 100% de cobertura:
- Validación de formularios
- Manejo de temas (dark/light mode)
- Gestión de estados de carga
- Mensajes de error

### Próximas mejoras sugeridas:
- Pruebas de componentes de template (HTML)
- Pruebas de accesibilidad
- Pruebas de performance
- Pruebas de compatibilidad entre navegadores

---

¡Con esta suite de pruebas tienes una base sólida para mantener la calidad del código en Flowork! 🚀
