import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { fetchUser } from './github.actions';

export interface GithubStateModel {
  user: Object;
}

@State({
  name: 'github',
  defaults: {
    user: null,
  }
})

export class GithubState {
  constructor(private store: Store) {}

  @Selector()
    static getUser(state: GithubStateModel) {
        return state.user;
  }

  @Action(fetchUser)
  async fetchUser(stateContext: StateContext<GithubStateModel>, action: fetchUser) {
    const data = await fetch('https://api.github.com/users/'+action.payload).then(data => data.json());
    stateContext.patchState({ user: data });
  }
}