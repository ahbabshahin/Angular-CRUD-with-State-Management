import { ProductState } from './state/product.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsComponent } from '../forms/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleProductComponent } from '../single-product/single-product.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../input-field/input-field.component';
import { SelectFieldComponent } from '../select-field/select-field.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PaginationComponent } from '../pagination/pagination.component';
import { AuthComponent } from '../auth/auth.component';
import {CookieService} from 'ngx-cookie-service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UploadComponent } from '../upload/upload.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { StoreModule } from '@ngrx/store';
import { productStateName } from './state/product.selector';
import { productReducer } from './state/product.reducer';
import { Reducer } from './productState';
import { categoryStateName } from './state/categoryState/category.selector';
import { categoryReducer } from './state/categoryState/category.reducer';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    ProductComponent,
    FormsComponent,
    TableComponent,
    SingleProductComponent,
    SearchComponent,
    CategoryComponent,
    InputFieldComponent,
    SelectFieldComponent,
    PaginationComponent,
    AuthComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    EffectsModule.forFeature([ProductEffects]),
    // StoreModule.forFeature()
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
exports:[
  ProductComponent,
  FormsComponent,
  TableComponent,
  SingleProductComponent,
  SearchComponent,
  CategoryComponent,
  InputFieldComponent,
  SelectFieldComponent,
  PaginationComponent,
  AuthComponent
],
  providers: [CookieService],
  bootstrap: [ProductComponent]
})

export class ProductModule { }
