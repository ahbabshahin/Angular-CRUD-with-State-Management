import {
  Component,
  Output,
  EventEmitter,
  Input,
  inject,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, throwError, Observable, tap } from 'rxjs';
import { Product } from '../models/product.models';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import {
  deleteDataStart,
  editDataStart,
  getDataStart,
  getSingleViewStart,
} from '../product/state/product.actions';
import { getProduct, getTotalProdect } from '../product/state/product.selector';
import { setLoadingSpinner } from '../shared/shared.actions';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() allProduct!: any;
  @Input() productList!: any;
  // @Input() category!: any;
  @Output() getDataFromTable: EventEmitter<any> = new EventEmitter();
  @Output() getDataFromTableFiltered: EventEmitter<any> = new EventEmitter();
  @Output() getSingleProductFC: EventEmitter<any> = new EventEmitter();
  subs!: Subscription;
  notFound!: string;
  constructor(
    private _product: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  productId: any;
  category: any = [];
  products: Product[] = [];
  product!: Observable<Product[]>;
  uproducts: any = [];
  sproducts: any = [];
  categor: any = '';
  searchText: any = '';
  limit: number = 10;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  currentPage: number = 1;
  total: number = 101;
  paginatedDatas = [];
  token: any = this._product.tokenSub.value;
  errorHandler: any;

  @ViewChild(MatTable) table: MatTable<Product> | undefined;

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'price',
    'discountPercentage',
    'rating',
    'stock',
    'brand',
    'category',
    'actions',
  ];
  dataSource = [];

  ngOnInit(): void {
    this.store.dispatch(getDataStart());
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.subs = this.store.select(getProduct).subscribe((data) => {
      this.products = data;
    });

    this.errorHandler = this._product.getError();
  }

  changePage(page: number) {
    this.currentPage = page;
    // console.log(this.currentPage);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this._product.page.next(this.products.length);
    return this.products.slice(start, end);
  }

  view(id: any) {
    if (!this.token) {
      this.toastr.info('You are not loggedIn!');
    } else {
      this.store.dispatch(getSingleViewStart({ id: id }));
      this.router.navigate([`product/${id}`]);
    }
  }

  edit(data: Product) {
    this._product.sendData(data);
  }

  delete(id: number) {
    if(confirm('Are you sure?')){
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(deleteDataStart({id: id}));
    }

  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getData();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.getData();
  }

  ngOnDestroy(): void {
    this._product.unsubscribe(this.subs);
  }

  // findProductByCategory(filterTerm: any) {
  //   if (this.products.length === 0 || this.categor === '') return this.products;
  //   else {
  //     return this.products.filter((item: any) => {
  //       if (filterTerm === 'none') return item;
  //       return item.category.toLowerCase() === filterTerm.toLowerCase();
  //       // return item;
  //     });
  //   }
  // }

  // get categor() {
  //   return this._categor;
  // }

  // set categor(data: any) {
  //   this._categor = data;
  //   this.productList = this.findProductByCategory(data);
  //   this.uproducts = this.findProductByCategory(data);
  //   this.getDataFromTableFiltered.emit(this.productList);
  // }

  // search() {
  //   this._product.search(this.searchText).subscribe((data: any) => {
  //     this.allProduct = data.products;
  //     this.getDataFromTable.emit(this.allProduct);
  //   });
  // }

  // getCategory() {
  //   this._product.getCategory().subscribe((data: any) => {
  //     this.category = data;
  //   });
  // }

  // getProduct(){
  //   this._product.getProduct(this.categor).subscribe((data:any)=>{
  //     this.allProduct = data.products;
  //     this.getDataFromTable.emit(this.allProduct);

  //   })
  // }
}
