import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { GithubState, GithubStateModel } from '../store/github.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-commits-details',
  templateUrl: './commits-details.component.html',
  styleUrls: ['./commits-details.component.css']
})
export class CommitsDetailsComponent implements OnInit {
  @Select(GithubState.commits) commits$: Observable<Object[]>;
  commits;
  constructor(private location: Location, private store: Store,
    ) { 
  }

  ngOnInit() {
  }

  goBack() {
    console.log("press")
    this.location.back();
  }

}
