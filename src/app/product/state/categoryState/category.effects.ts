import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';
import { AppState } from 'src/app/state/app.state';
import { map, mergeMap } from 'rxjs';
import { categoryFetchStart, categoryFetchSuccess } from './category.actions';
@Injectable()
export class CategoryEffects{
  constructor(
    private _action: Actions,
    private _product: ProductService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  getCategory = createEffect(() => {
    return this._action.pipe(
      ofType(categoryFetchStart),
      mergeMap((action) =>{
        return this._product.getCategory().pipe(
          map((data) =>{
            return this.store.dispatch(categoryFetchSuccess({category:data}))

          })
        )
      })
    )
  },
  {dispatch:false}
  );
}
