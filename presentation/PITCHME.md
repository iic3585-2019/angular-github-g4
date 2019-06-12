---
marp: true
---

# Angular

![](./logo.png)

### Grupo 4

###### Natalia Barra - Luis Chodiman - Mauricio Ortiz

---

# Demo

---

# Puntos principales

- Angular
  - Componentes
  - Angular vs Vue vs React
- NGXS
- API
- Testing
  - Unit Testing with Karma
  - E2E Testing with Cypress

---

# Angular

Aspectos importantes utilizados en la aplicación

---

## Components

Archivos `.vue` que contienen toda la estructura de un componente (HTML, JS, CSS)

```
<template>
</template>

<script>
export default {
  name: "componentName"
  data() { // state del componente
    return { // datos del state
      show: true
    }
  }
  method: {
    // funciones
  }
  // otras propiedades
}
</script>

<style>
</style>
```

---

# Angular vs Vue vs React

# ![](./VueVsReact.png)

---

## Similitudes

- Frameworks JS enfocados en la interfaz de usuario (frontend)
- DOM Virtual
- Arquitectura basada en componentes

---

## Diferencias

- `<template>` vs `JSX`
- Comunidad
- Curva de aprendizaje
- Estado vs data
- Aplicaciones móviles
- Vue es "más delgado"

---

# NGXS

- Redux de Vue
- Características principales:
  - _store_: similar al de React. Además del state, contiene también los actions, mutations y getters.
  - _actions_: también actuan como "action-creators".
  - _mutations_: básicamente los "reducers"
  - _getters_: retornan información del store.

---

## Principios a tener en cuenta

- La única forma de alterar el estado es a través de _mutations_
- _Mutations_ deben ser **síncronas**
- Lógica asíncrona debe ser encapsulada en _actions_

---

# API

Versión gratuita de [OpenWeatherMap](https://openweathermap.org/api)

```javascript
const weatherData = await fetch(
  `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${
    process.env.VUE_APP_APP_ID
  }&units=${scale.param}`
).then(data => data.json());
```

---

# Testing

---

## Conclusiones del testing

- Menos información (tutoriales, artículos, blogs) en comparación a `React`, en especial en componentes con `Vuex`
- Se puede usar `Jest`
- `Enzyme` es reemplazado por `vue-test-utils`
- Es necesario realizar un _mock_ del `store` para testear componentes con `Vuex`

---

# Conclusiones finales

- Buena documentación
- Curva de aprendizaje sencilla
- Buenas herramientas para el _developer_: CLI, DevTools, etc

---

# Angular

![](./logo.png)

### Grupo 4

###### Natalia Barra - Luis Chodiman - Mauricio Ortiz

---

# Referencias

- https://flaviocopes.com/tags/vue/
