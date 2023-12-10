import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  allProduct: Product[] = [];
  productList: any = [];
  singleProduct: any = [];
  visible: any = false;
  showForm: any = true;

  constructor(private _product: ProductService, private route: Router) {}
  token: any = this._product.tokenSub.value;

  ngOnInit(): void {
    // console.log(this.token)
    this._product.reload();
    // console.log(this._product.getCookie('user'));
  }


  getDataFromTable(data: any) {
    this.allProduct = data;
    // console.log(this.allProduct);
    return this.allProduct;
  }

  getDataFromTableFiltered(data: any) {
    this.productList = data;
    // console.log(this.allProduct);
    return this.productList;
  }

  getSingleProduct(data: any) {
    this.singleProduct = data;
    //  console.log(this.singleProduct);
  }

  onClick() {
    this.visible = !this.visible;
    this.showForm = !this.showForm;
  }

  getSearchItem(data: any) {
    this.allProduct = data;
  }

  getCategoryItem(data: any) {
    this.allProduct = data;
  }

  logout() {
    this._product.logout();
    console.log(this._product.token);
    document.location.reload();
  }
}
