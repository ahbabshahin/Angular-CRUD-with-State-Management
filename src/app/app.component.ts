import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Renderer2,
} from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AppState } from './state/app.state';
import { getErrorMessage, getLoading } from './shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  title = 'dummy-json';
  allProduct: any = [];
  productList: any = [];
  singleProduct: any = [];
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<string>;
  show:boolean = false;
  // category: any = [];
  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.showLoading = this.store.select(getLoading);
      this.errorMessage = this.store.select(getErrorMessage);
    }, 0);
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.showLoading = this.store.select(getLoading);
      this.errorMessage = this.store.select(getErrorMessage);
      if(this.errorMessage){
        this.show = true;
      }
    }, 0);

    setTimeout(()=>{
      this.show = false;
    }, 3500);
  }

  getDataFromTable(data: any) {
    this.allProduct = data;
    console.log(this.allProduct);
    // this.getCategory();
    return this.allProduct;
  }

  getDataFromTableFiltered(data: any) {
    this.productList = data;
    console.log(this.allProduct);
    return this.productList;
    // this.getCategory();
  }

  getSingleProduct(data: any) {
    this.singleProduct = data;
    //  console.log(this.singleProduct);
  }

  // getCategory() {

  //   this.allProduct.forEach((item: any) => {
  //     // console.log(item.category);
  //     if (!this.category.includes(item.category)) this.category.push(item.category);
  //   });

  //   console.log(this.category);
  // }
}
