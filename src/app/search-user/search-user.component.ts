import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Store, Select } from '@ngxs/store';
import { fetchUser } from '../store/github.actions';
import { GithubState, GithubStateModel } from '../store/github.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchForm;
  username: string;
  @Select(GithubState.repos) repos$: Observable<Object[]>;
  @Select(GithubState.userName) username$: Observable<string>;
  @Select(GithubState.avatar) avatar$: Observable<string>;
  @Select(GithubState.isFetching) isFetching$: Observable<boolean>;
  // @Select(GithubState.test) test$: Observable<any>;
  test$;
  test;

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
    this.store.dispatch(new fetchUser(userData.username));
  }

  clearInput() {
    this.searchForm.reset();
  }
  
  ngOnInit() {
  }

}
