import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../state/app.state';
import { getSingleViewStart } from '../product/state/product.actions';
import { setLoadingSpinner } from '../shared/shared.actions';
import { getProductById, getSingleProduct } from '../product/state/product.selector';
import { Product } from '../models/product.models';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent {
  @Input() allProduct!: any;
  @Input() singleProduct: any = {};
  product: any = {};
  products: any = [];
  id!: any;
  // route: ActivatedRoute = inject(ActivatedRoute);
  // productId = 0;
  data: any = 0;
  len: any;
  checks: boolean = false;
  subs!: Subscription;

  constructor(
    private _product: ProductService,
    private route: ActivatedRoute,
    private _location: Location,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {}
  errorHandler: any;
  ngOnInit(): void {
    // this.product = this.store.select(getProductById);
    // log
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(getSingleViewStart({ id: this.id }));
    this._product.reload();
    this.fetch();
    this.errorHandler = this._product.getError();
  }

  fetch() {
     this.subs = this.store.select(getProductById).subscribe((data) =>{
      // console.log(data);
      this.product = data;
    });

    // this.store.select(getSingleProduct).subscribe((data) =>{
    //   this.products = data;
    //   console.log(data);

    // })

  }

  close() {
    this._location.back();
  }

  ngOnDestroy(): void {
    this._product.unsubscribe(this.subs);
  }
}
