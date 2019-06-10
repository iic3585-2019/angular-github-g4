import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Store, Select } from '@ngxs/store';
import { fetchUser } from '../store/github.actions';
import { GithubStateModel } from '../store/github.state';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchForm;
  username: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.searchForm = this.formBuilder.group({
      username: '',
    });
    this.username = '';
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
