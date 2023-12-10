import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductModule } from './product/product.module';
import { CommonInterceptor } from './common.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product/state/product.effects';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { appReducer } from './state/app.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './shared/router/custom-serializer';
import { CategoryEffects } from './product/state/categoryState/category.effects';

@NgModule({
  declarations: [AppComponent, LoaderSpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    // ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ProductModule,
    StoreModule.forRoot(appReducer, {runtimeChecks:{
      strictActionImmutability:true,
      strictStateImmutability:true,
      strictActionWithinNgZone:true,
      strictActionTypeUniqueness:true
    }}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forRoot([CategoryEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
