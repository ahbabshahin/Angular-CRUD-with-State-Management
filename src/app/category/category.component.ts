import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { getCategory } from '../product/state/categoryState/category.selector';
import { categoryFetchStart } from '../product/state/categoryState/category.actions';
import {
  getDataFromCategoryStart,
  getDataStart,
} from '../product/state/product.actions';
import { setLoadingSpinner } from '../shared/shared.actions';
import { getProduct } from '../product/state/product.selector';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() allProduct!: any;
  @Output() getCategoryItem: EventEmitter<any> = new EventEmitter();
  category: any = [];
  categor: any = '';
  subs!: Subscription;
  constructor(
    private _product: ProductService,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.store.dispatch(categoryFetchStart());
    this.subs = this.store.select(getCategory).subscribe((categor) => {
      categor.forEach((data, i) => {
        this.category[i] = data.value;
      });
    });
  }

  getProduct() {
    if (this.categor == 'none') {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(getDataStart());

      this.store.select(getProduct);
    } else {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(getDataFromCategoryStart({ categor: this.categor }));
      this.store.select(getProduct);
    }
  }

  ngOnDestroy(): void {
    this._product.unsubscribe(this.subs);
  }
}
