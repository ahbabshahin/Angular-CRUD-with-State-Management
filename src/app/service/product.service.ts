import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, map } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // httpOptions: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  // });

  params: HttpParams = new HttpParams().set('limit', '100').set('skip', '0');

  constructor(
    private _http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  private subject = new BehaviorSubject<any>(null);

  public AllProduct = [];
  public progress: number = 0;
  // public token = localStorage.getItem('token');
  // public token = this.cookie.get('token');
  public token = this.getCookie('token');
  public user = this.getCookie('user');

  public tokenSub = new BehaviorSubject(this.token?.value);
  public userSub = new BehaviorSubject(this.user?.value);
  public isLogIn = new BehaviorSubject<boolean>(
    this.token?.value ? true : false
  );
  public isLogOut = new BehaviorSubject<boolean>(
    this.user?.value ? false : true
  );
  page = new Subject();
  postData(data: string): Observable<Product> {
    return this._http
      .post<Product>('https://dummyjson.com/products/add', data, )

  }

  getData(): Observable<any> {
    return this._http.get('https://dummyjson.com/products', {
      params: this.params,
    });
  }

  deleteProduct(id: number): Observable<Product> {
    return this._http.delete<Product>(`https://dummyjson.com/products/${id}`);
  }

  updateData(id: number, data: any): Observable<Product> {
    return this._http.put<Product>(`https://dummyjson.com/products/${id}`, data);
  }

  sendData(data: Product) {
    this.subject.next(data);
  }

  editData(): Observable<Product> {
    return this.subject.asObservable();
  }

  search(data: string): Observable<any> {
    return this._http.get(`https://dummyjson.com/products/search?q=${data}`,{
      params: this.params,
    });
  }

  getCategory(): Observable<any> {
    return this._http.get('https://dummyjson.com/products/categories');
  }

  getProduct(data: string): Observable<any> {
    console.log(data);

    return this._http.get<any>(`https://dummyjson.com/products/category/${data}`, {
      params: this.params,
    });
  }

  getSingleProduct(id: string): Observable<Product> {
    return this._http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  login(data: any) {
    return this._http.post('https://dummyjson.com/auth/login', data);
  }

  logout() {
    this.isLogIn.next(false);
    this.isLogOut.next(true);
    this.tokenSub.next(null);
    this.deleteCookie('user');
    this.deleteCookie('token');
  }

  reload() {
    // if (this.cookie.get('user')) {
    //   this.isLogIn.next(true);
    // }
    if (this.user?.value) {
      this.isLogIn.next(true);
      this.isLogOut.next(false);
    }

    if (!this.user) {
      this.isLogOut.next(true);
    }
  }

  setCookie(key: any, value: any, expires?: any) {
    let time = new Date();

    if (!expires) expires = 1;

    time.setTime(time.getTime() + expires * 24 * 60 * 60 * 1000);

    let expire = 'expires=' + time.toUTCString();

    document.cookie = `${key}=${value};${expire}`;
  }

  getCookie(key: any) {
    let cookie = document.cookie.split(';');

    let res: any = [];

    for (let i = 0; i < cookie.length; i++) {
      cookie[i] = cookie[i].trim();
    }

    cookie.forEach((item: any) => {
      item.trim();
      const [key, value] = item.split('=');

      res.push({
        key,
        value,
      });
    });
    let value: any = {};

    for (let i = 0; i < res.length; i++) {
      if (res[i].key == key) {
        value = {
          key: res[i].key,
          value: res[i].value,
        };
        return value;
      } else {
        continue;
      }
    }
  }

  deleteCookie(key: any) {
    let token = this.getCookie(key);
    console.log(token);

    this.setCookie(token.key, '', -1);
  }

  unsubscribe(subs: Subscription) {
    if (subs) {
      subs.unsubscribe();
      // console.log('unsub');
    }
  }

  error = [
    {
      status:400,
      message: 'Invalid Credentials'
    },
    {
      status:401,
      message: 'Unauthenticated'
    },
    {
      status:403,
      message: 'You are not authorized'
    },
    {
      status:404,
      message: 'The route you are trying to access is not found'
    },
    {
      status:500,
      message: 'Internal Server Error'
    },
    {
      status:503,
      message: 'Server is under maintenance'
    },
  ];

  getError(){
    return this.error;
  }

  formStructure = [
    {
      type: 'text',
      label: 'Title',
      name: 'title',
      value: '',
      box: '',
      validations: [
        {
          name: 'required',
          type: 'required',

          message: 'Title is required',
        },
        {
          name: 'minLength(5)',
          type: 'minLength(5)',
          // "value": 5,
          message: 'Title must be at least 5 character long',
        },
        {
          name: 'maxLength(50)',
          type: 'maxLength(50)',
          value: 50,
          message: 'Title must be at most 50 character long',
        },
      ],
    },

    {
      type: 'text',
      label: 'Description',
      name: 'description',
      value: '',
      box: '',
      validations: [
        {
          name: 'required',
          type: 'required',
          message: 'Description is required',
        },
        {
          name: 'minLength(50)',
          type: 'minLength(50)',
          value: 50,
          message: 'Description must be at least 50 character long',
        },
        {
          name: 'maxLength(90)',
          type: 'maxLength(90)',
          value: 90,
          message: 'Description must be at most 90 character long',
        },
      ],
    },

    {
      type: 'number',
      label: 'Price',
      name: 'price',
      value: '',
      box: '',
      validations: [
        {
          name: 'required',
          type: 'required',

          message: 'Price is required',
        },
      ],
    },

    {
      type: 'number',
      label: 'Discount Percentage',
      name: 'discountPercentage',
      value: '',
      box: '',
      validations: [
        {
          name: 'required',
          type: 'required',

          message: 'Discount Percentage is required',
        },
      ],
    },

    {
      type: 'number',
      label: 'Rating',
      name: 'rating',
      value: '',
      box: '',
      validations: [],
    },

    {
      type: 'number',
      label: 'Stock',
      name: 'stock',
      value: '',
      box: '',
      validations: [
        {
          name: 'required',
          type: 'required',

          message: 'Stock is required',
        },
      ],
    },

    {
      type: 'text',
      label: 'Brand',
      name: 'brand',
      value: '',
      box: '',
      validations: [
        {
          name: 'required',
          type: 'required',

          message: 'Brand is required',
        },
        {
          name: 'minLength(5)',
          type: 'minLength(5)',
          // "value": 5,
          message: 'Brand must be at least 5 character long',
        },
        {
          name: 'maxLength(50)',
          type: 'maxLength(50)',
          value: 50,
          message: 'Brand must be at most 50 character long',
        },
      ],
    },

    {
      type: 'select',
      label: 'Category',
      name: 'category',
      value: '',
      box: 'select',
      validations: [
        {
          name: 'required',
          type: 'required',

          message: 'Category is required',
        },
      ],
    },
  ];

  getFormStructure() {
    return this.formStructure;
  }

  validationStructure = {
    title: [
      {
        type: 'required',
        message: 'Title is required',
      },
      {
        type: 'minlength',
        message: 'Title must be at least 5 character long',
      },
      {
        type: 'maxlength',
        message: 'Title must be at most 50 character long',
      },
      {
        type: 'pattern',
        message: 'No special character is allowed',
      },
    ],

    description: [
      {
        type: 'required',
        message: 'Description is required',
      },
      {
        type: 'minlength',
        message: 'Description must be at least 50 character long',
      },
      {
        type: 'maxlength',
        message: 'Description must be at most 90 character long',
      },
    ],

    price: [
      {
        type: 'required',
        message: 'Price is required',
      },
      {
        type: 'pattern',
        message: 'Price must be greater than 0',
      },
    ],

    discountPercentage: [
      {
        type: 'required',

        message: 'Discount Percentage is required',
      },
      {
        type: 'pattern',
        message: 'Discount Percentage must be a decimal number. Ex. 2.0',
      },
    ],

    stock: [
      {
        type: 'required',

        message: 'Stock is required',
      },
      {
        type: 'pattern',
        message: 'Stock must always be a number',
      },
    ],

    brand: [
      {
        type: 'required',

        message: 'Brand is required',
      },
      {
        type: 'minlength',
        message: 'Brand must be at least 5 character long',
      },
      {
        type: 'maxlength',
        message: 'Brand must be at most 50 character long',
      },
    ],

    category: [
      {
        type: 'required',

        message: 'Category is required',
      },
    ],
  };

  getValidationStructure() {
    return this.validationStructure;
  }
}
