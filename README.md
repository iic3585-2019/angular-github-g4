# Angular Github G4

## Contexto

"Github User Searcher" es una sencilla aplicación realizada con Angular que permite buscar usuarios en Github y poder ver información de sus repositorios públicos.

Tras buscar uno, una lista de sus repositorios disponibles aparecerá. Al hacer click al nombre de uno, podrá ver más detalles de ese repositorio.

Dentro de estos detalles, también aparecerán los commits realizados, y al hacer click en "(más detalle)", aparecerá una lista con los mensajes de los commits y la hora en que se realizó.

## Requisitos
Esta aplicación fue creada usando la CLI de Angular. Para poder correrla, se requiere instalar: `npm install -g @angular/cli`.

## Ejecución
Para ejecutar y ver la aplicación, en la línea de comando escribir `ng serve -o` para correr servidor. El parámetro `-o` abrirá el navegador por defecto en la dirección `http://localhost:4200/`, en donde se encontrará la aplicaición.


## Componentes principales

### Search User
La carpeta `src/search-user` es la que abarca el componente que uno ve al ingresar al home de la aplicación.

`search-user.component.ts`
```javascript
// librerías para acceder y comunicarse con la store de ngxs
import { Store, Select } from '@ngxs/store';
import { fetchUser } from '../store/github.actions';
import { GithubState, GithubStateModel } from '../store/github.state';

export class SearchUserComponent implements OnInit {
  searchForm;
  username: string;
  // extraemos data del store
  @Select(GithubState.repos) repos$: Observable<Object[]>;
  // (...)

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    
  ) {
    this.searchForm = this.formBuilder.group({
      username: '',
    });
    // could only make it work this way
    this.test$ = this.store.select(s => s.github.test).subscribe(a =>{
      this.test = a;
    });
  }

  onSubmit(userData) {
    // mandamos acción al store
    this.store.dispatch(new fetchUser(userData.username));
  }
  

}
```

`search-user.component.html`
```html
<div class="main-search">
  <div class="row">
    <form class="container-form" [formGroup]="searchForm" (ngSubmit)="onSubmit(searchForm.value)">
      <div>
        <label>Ingrese nombre de usuario</label>
        <input type="text" formControlName="username" placeholder="username">
      </div>

      <button class="button" type="submit">
        Buscar
      </button>

    </form>
  </div>

  <!-- Mostrar mientras se hace fetch a la API de Github-->

  <h4 *ngIf="isFetching$ | async">Cargado...</h4>

  <!-- Mostrar información del usuario y sus repos cuando hayan cargado -->
  <div class="row">
    <div class="col">
      <img [src]="avatar$ | async" width="100px">
    </div>
    <div class="col-centered">
      <h1>{{ username$ | async }}</h1>
      <h3>{{ realname$ | async }}</h3>
    </div>
  </div>

  <div class="row">
    <h2 *ngIf="userFetched$ | async">Repositorios</h2>
  </div>
  <div class="row">
    <div class="col">
      <ul *ngFor="let repo of repos$ | async">
        <li>
          <a class="list-link" [routerLink]="['/repos', repo.name]">{{ repo.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### Repo Details & Commit Details
Ambos son componentes similares que solo muestran más info del repo respectivo , por lo que solo se mencionan. Lo único importante es que al ingresar al repo, se hace fetch de más inforación a la API.

### Router
Usando la API Router, se controla el flujo de la aplicación. Como detalle adicional, si se ingresa una ruta que no estaba considerada por la aplicación, redireccionará al home de la página.

### NGXS
Se utilizó la librería NGXS para implementar Redux en la aplicación. Este se encuentra en la carpeta `src/store` y contiene actions y state, este último actuando como la store y reducers de Redux de React y Vue.

Con NGXS, la aplicación contiene toda la información que utiliza la aplicación en sus distintas vistas, además de hacer las llamadas a la API de Github.

#### State
Define la store misma, y maneja los dispatchs que revisen, por lo que también modifica el state al siguiente que corresponda. 

Dentro de cada función de acción, se hace la llamada a la api se maneja la respuesta para estructurarla y guardarla en la store, además de verificar si el request fue exitoso, en caso de requerer hacer otro más. Mientras se realizan, se modifican los booleanos que le indican a los componentes si el fetch está en progreso o no (ej: `userFetched`).


```javascript

import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { fetchUser, fetchRepo } from './github.actions';

export interface GithubStateModel {
  userName: string,
  // (...)
}

const main_url = 'https://api.github.com/';

@State({
  name: 'github',
  defaults: {
    userName: '',
    realName: '',
    avatar: '',
    repos: [],
    isFetching: false,
    currentRepo: {
      commits: [],
    },
    repoFetched: false,
    userFetched: false,
    currentCommits: [],
  }
})

export class GithubState {
  
  @Selector()
  static realName(state: GithubStateModel) {
    return state.realName;
  }

  // (muchos más...)

  // acciones que realizan cuando se hace dispatch a la store
  
  @Action(fetchUser)
  async fetchUser(stateContext: StateContext<GithubStateModel>, action: fetchUser) {
    stateContext.patchState({ isFetching: true, userFetched: false });
    const userData = await fetch(main_url+'users/'+action.payload)
      .then(data => data.json())
      .catch(() => console.log('no user'));
    
    const user = { realName: userData.name, avatar: userData.avatar_url, userName: userData.login };
    const reposData = await fetch(userData.repos_url)
      .then(data => data.json())
      .catch(() => console.log('no repos'));
    if(reposData) {
      const repos = reposData.map(r => ({ name: r.name, url: r.url }));
      stateContext.patchState({ ...user, repos });
      stateContext.patchState({ userFetched: true });
    }
    stateContext.patchState({ isFetching: false, test: {...userData} });
  }

  @Action(fetchRepo)
  async fetchRepo(stateContext: StateContext<GithubStateModel>, action: fetchUser) {
    stateContext.patchState({ isFetching: true, repoFetched: false });
    const copyState = stateContext.getState();
    const url = main_url+'repos/'+copyState.userName+'/'+action.payload;
    console.log("fetch to", url);
    const repoData = await fetch(url)
      .then(data => data.json())
      .catch(() => console.log('no repo'));
    let repo = {
      name: repoData.name,
      size: (repoData.size/1024).toFixed(2)+'MB',
      description: repoData.description,
      createdAt: (new Date(repoData.created_at)).toLocaleString(),
      updatedAt: (new Date(repoData.updated_at)).toLocaleString(),
      language: repoData.language,
    }

    if(repoData.name) {
      const commitsData = await fetch(url+'/commits')
        .then(data => data.json());
      repo['commits'] = commitsData.length;
      console.log(commitsData);
      const commits = commitsData.map(c => {
        return {
          name: c.commit.committer.name,
          message: c.commit.message,
        }
      })
      stateContext.patchState({
        repoFetched: true,
        currentCommits: [...commits],
        currentRepo: {...repo} 
      });
    }

    stateContext.patchState({ isFetching: false});
  }
}
```

#### Actions
Solo definen las constantes que va a reconocer la store. También son las funciones que uno hace dispatch desde las componentes

```javascript
  export class fetchUser {
    static readonly type = '[Github] Fetch User';
    constructor(public payload: string) {}
  }

  export class fetchRepo {
    static readonly type = '[Github] Fetch Repo';
    constructor(public payload: string) {}
  }
```