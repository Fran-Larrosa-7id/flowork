# 🔧 Configuración de Testing para Apps Zoneless Angular

Esta guía documenta los pasos específicos necesarios para configurar testing en aplicaciones Angular que usan **zoneless change detection**.

## 🚨 Problema

Las aplicaciones Angular zoneless no cargan Zone.js por defecto, pero las herramientas de testing (Jasmine/Karma) aún requieren Zone.js para funcionar correctamente.

## ✅ Solución Paso a Paso

### 1. Instalar Zone.js como dependencia de desarrollo

```bash
npm install zone.js --save-dev
```

### 2. Crear archivo `src/polyfills.ts`

```typescript
// src/polyfills.ts
import 'zone.js';          // Zone JS es necesario para Karma/Jasmine
import 'zone.js/testing';  // Específico para testing
```

### 3. Configurar `angular.json`

Agregar el polyfills en la sección de test:

```json
{
  "projects": {
    "tu-proyecto": {
      "architect": {
        "test": {
          "builder": "@angular/build:karma",
          "options": {
            "polyfills": ["src/polyfills.ts"],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

### 4. Crear `karma.conf.js` personalizado

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
    client: {
      clearContext: false
    },
    files: [
      { pattern: './src/polyfills.ts', watched: false }
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

### 5. Verificar `tsconfig.spec.json`

Asegurar que incluye los tipos de Jasmine:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

## ⚡ Scripts de Testing

Agregar al `package.json`:

```json
{
  "scripts": {
    "test": "ng test",
    "test:coverage": "ng test --code-coverage",
    "test:ci": "ng test --watch=false --browsers=ChromeHeadless --code-coverage"
  }
}
```

## 🧪 Verificación

Ejecutar las pruebas para verificar que todo funciona:

```bash
npm run test:ci
```

Deberías ver:
- ✅ Pruebas ejecutándose sin errores de Zone.js
- ✅ Reportes de cobertura generados
- ✅ Sin warnings sobre zoneless/Zone.js conflicts

## 🎯 Resultado Esperado

```
Chrome Headless: Executed X of X SUCCESS
=============================== Coverage summary ===============================
Statements   : XX.XX% (XX/XX)
Branches     : XX.XX% (XX/XX)
Functions    : XX.XX% (XX/XX)
Lines        : XX.XX% (XX/XX)
================================================================================
```

## 📚 Referencias

- [Angular Zoneless Change Detection](https://angular.dev/guide/experimental/zoneless)
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Karma Configuration](https://karma-runner.github.io/latest/config/configuration-file.html)

---

> 💡 **Tip**: Esta configuración es específica para apps zoneless. Las apps Angular tradicionales no requieren estos pasos adicionales.
