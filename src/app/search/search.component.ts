import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { setLoadingSpinner } from '../shared/shared.actions';
import { searchDataStart } from '../product/state/product.actions';
import { getProduct } from '../product/state/product.selector';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() allProduct!: any;
  @Output() getSearchItem: EventEmitter<any> = new EventEmitter();
  searchText: any = '';
  notFound: any = ['No product found'];
  subs!: Subscription;
  constructor(private _product: ProductService, private toastr: ToastrService, private store: Store<AppState>) {}

  search() {
    this.store.dispatch(searchDataStart({searchText: this.searchText}));
    this.store.select(getProduct);
  }
  ngOnDestroy(): void {
    this._product.unsubscribe(this.subs);
  }
}
