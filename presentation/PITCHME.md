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

- Angular vs Vue vs React
- Testing
  - Unit Testing con Karma

---

# Angular vs Vue vs React

## Diferencias

- Curva de aprendizaje difícil en comparación
- _Convention over configuration_
- La mayoría de las utilidades vienen instaladas y configuradas
- El más pesado de los tres
- Uso de TypeScript
---

# Testing

## Unit testing con Karma

Instalar dependencias: **Ya viene todo instalado!**

Configurar el cómo correr tests: `karma.conf.js`

Definiciones importantes:

- `Fixture`: El ambiente del componente
- `DebugElement`: El `html` del componente ya renderizado

**Todo el _boilerplate_ de los tests ya viene hecho!**

---

Ejemplo: Las utilidades funcionan de igual manera a con `Jest`

```javascript
describe("MyAwesomeComponent", () => {
  beforeEach(() => {
    // reproduce the test state
  });

  it("should be awesome", () => {
    expect(component).toBe(awesome);
  });

  // More specs here
});
```

Y ejecutar `ng test` o `ng e2e`

---

Ejemplo en el proyecto:

```javascript
export class AlertButtonComponent implements OnInit {
  content = "This is a notification to be tested!";
  hideContent = true;
  severity = 423;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.hideContent = !this.hideContent;
  }

  toggleAsync() {
    timer(500).subscribe(() => {
      this.toggle();
    });
  }
}
```

---

Sus tests serían:

```javascript
it("should create", () => {
  expect(component).toBeTruthy();
});

it("should have a message with 'tested'", () => {
  expect(component.content).toContain("tested");
});

it("should have an H1 tag of 'Alert Button'", () => {
  expect(de.query(By.css("h1")).nativeElement.innerText).toBe("Alert Button");
});

it("should toggle the message boolean", () => {
  expect(component.hideContent).toBeTruthy();
  component.toggle();
  expect(component.hideContent).toBeFalsy();
});
);
```

---

Y para testear cosas asíncronas: `fakeAsync()`

```javascript
it("should toggle the message boolean asynchronously", fakeAsync(() => {
  expect(component.hideContent).toBeTruthy();
  component.toggleAsync();
  tick(500);
  expect(component.hideContent).toBeFalsy();
})
```

---

## Conclusiones del testing

- Nos faltó probar la experiencia de `e2e` testing con `Protractor` o `Cypress`
- Tiene el ambiente de testing más completo y amigable gracias a la `CLI`
- Bastante documentación

Ranking final en testing:

1. Angular (por lejos)
2. React
3. Vue

---

# Conclusiones finales

- Curva de aprendizaje difícil en comparación
- Requiere de más estudio para aprender las _conventions_
- Buenas herramientas para el _developer_: CLI, DevTools, etc
- Útil en un ambiente empresarial
- Redux útil para aplicaciones más grandes, pero para más pequeñas `services` es más que suficiente

---

# Angular

![](./logo.png)

### Grupo 4

###### Natalia Barra - Luis Chodiman - Mauricio Ortiz

---
