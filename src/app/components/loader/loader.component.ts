import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoadingState } from 'src/store/loading/LoadingState';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent  implements OnInit {

  loadingState$ !: Observable<LoadingState>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }

}
