import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';
import { ProductService } from './service/product.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private _product: ProductService,private toastr: ToastrService,) {}
  token: any = this._product.tokenSub.value;
  // ngOnInit(): void {
  //   console.log(this.token);
  // }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    let httpOptions!: HttpHeaders;
    // console.log(request);

    if(request.headers.get("skip")){
      httpOptions = new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Authorization': `bearer ${this.token}`,
      });
    }
    else{
      httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${this.token}`,
      });
    }

    return next.handle(request.clone({ headers: httpOptions}));
  }
}
