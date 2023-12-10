import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form!: FormGroup;
  reload: boolean = false;
  subs!: Subscription;
  constructor(
    private _fb: FormBuilder,
    private _product: ProductService,
    private router: Router,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}
  errorHandler: any;
  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['kminchelle', [Validators.required]],
      password: ['0lelplR', [Validators.required]],
    });
    this.errorHandler = this._product.getError();
    this._product.reload();
  }

  onSubmit() {
    console.log(this.form.value);
    let value = this.form.value;
    let data = {
      body: JSON.stringify({
        username: value.username,
        password: value.password,
        expiresInMins: 60,
      }),
    };

    this.subs = this._product.login(data.body).subscribe(
      (res: any) => {
        // localStorage.setItem('token', res.token);
        // this.cookie.set('token', res.token, {expires:1});
        // window.cookieStore.setItem('token', res.token, 1)

        this._product.tokenSub.next(res.token);
        this.reset();
        if (res) {
          this._product.isLogIn.next(true);
          this._product.isLogOut.next(false);
          // console.log(res);

          // localStorage.setItem('user', res.username);
          // this.cookie.set('user', res.username, {expires:1});
          this._product.setCookie('user', res.username, 1);
          this._product.setCookie('token', res.token, 1);
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.errorHandler.forEach((err: any) => {
          if (err.status === error) {
            this.toastr.error(err.message);
          }
        });
        console.log(error);
      }
    );
  }

  reset() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this._product.unsubscribe(this.subs);
  }
}
