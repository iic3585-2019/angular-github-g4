import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { fetchUser, fetchRepo } from './github.actions';
import { TestBed } from '@angular/core/testing';

export interface GithubStateModel {
  userName: string,
  realName: string,
  avatar: string,
  repos: Object[],
  isFetching: boolean,
  test: Object,
  currentRepo: Object,
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
    test: {},
    currentRepo: {},
  }
})

export class GithubState {
  // constructor(private store: Store) {}

  @Selector()
  static realName(state: GithubStateModel) {
    return state.realName;
  }

  @Selector()
  static userName(state: GithubStateModel) {
    return state.userName;
  }

  @Selector()
  static avatar(state: GithubStateModel) {
    return state.avatar;
  }

  @Selector()
  static isFetching(state: GithubStateModel) {
    return state.isFetching;
  }

  @Selector()
  static repos(state: GithubStateModel) {
    return state.repos;
  }

  @Selector()
  static test(state: GithubStateModel) {
    return state.test;
  }

  @Action(fetchUser)
  async fetchUser(stateContext: StateContext<GithubStateModel>, action: fetchUser) {
    stateContext.patchState({ isFetching: true });
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
    }
    const copy = {...stateContext.getState()};
    stateContext.setState({ ...copy, test: {... userData}});
    stateContext.patchState({ isFetching: false });
  }

  @Action(fetchRepo)
  async fetchRepo(stateContext: StateContext<GithubStateModel>, action: fetchUser) {
    
    stateContext.patchState({ isFetching: true });
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
      createdAt: repoData.createdAt,
      updatedAt: repoData.updatedAt,
      language: repoData.language,
    }

    if(repoData) {
      const commitsData = await fetch(url+'/commits')
        .then(data => data.json());
      repo['commits'] = commitsData.length;

    }

    stateContext.patchState({ isFetching: false, currentRepo: {...repo} });
  }
}