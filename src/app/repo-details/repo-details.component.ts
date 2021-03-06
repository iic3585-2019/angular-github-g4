import { Component, OnInit } from '@angular/core';

import { Store, Select } from '@ngxs/store';
import { fetchRepo } from '../store/github.actions';
import { GithubState, GithubStateModel } from '../store/github.state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent implements OnInit {
  currentRepo$;
  @Select(GithubState.isFetching) isFetching$: Observable<boolean>;
  @Select(GithubState.repoFetched) repoFetched$: Observable<boolean>;
  @Select(GithubState.commits) commits$: Observable<Object[]>;

  isFetching;
  repoFetched;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { 
    this.store.select(s => s.github.currentRepo).subscribe(a =>{
      this.currentRepo$ = a;
    });
    this.isFetching$.subscribe(a => {
      this.isFetching = a;
    });
    this.repoFetched$.subscribe(a => {
      this.repoFetched = a;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(new fetchRepo(params.get('repo')));
    });
    
  }

}
