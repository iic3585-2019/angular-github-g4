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
  currentCommits: Object[],
  repoFetched: boolean,
  userFetched: boolean,
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
    currentRepo: {
      commits: [],
    },
    repoFetched: false,
    userFetched: false,
    currentCommits: [],
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

  @Selector()
  static commits(state: GithubStateModel) {
    console.log(state.currentCommits);
    return state.currentCommits;
  }


  @Selector()
  static repoFetched(state: GithubStateModel){
    return state.repoFetched;
  }

  @Selector()
  static userFetched(state: GithubStateModel){
    return state.userFetched;
  }

  @Action(fetchUser)
  async fetchUser(stateContext: StateContext<GithubStateModel>, action: fetchUser) {
    stateContext.patchState({ isFetching: true, userFetched: false });
    const userData = await fetch(main_url+'users/'+action.payload)
      .then(data => data.json())
      .catch(() => console.log('no user'));
    console.log(userData);
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
      console.log("here");
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