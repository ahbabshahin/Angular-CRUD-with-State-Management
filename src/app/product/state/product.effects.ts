import { productAdapter } from './product.state';
import { ProductService } from 'src/app/service/product.service';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addDataStart,
  addDataSuccess,
  deleteDataStart,
  deleteDataSuccess,
  editDataStart,
  editDataSuccess,
  getDataFromCategoryStart,
  getDataFromCategorySuccess,
  getDataStart,
  getDataSuccess,
  getSingleViewStart,
  getSingleViewSuccess,
  searchDataStart,
  serachDataSuccess,
} from './product.actions';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/shared/shared.actions';
import { ToastrService } from 'ngx-toastr';
import { Update } from '@ngrx/entity';
import { Product } from 'src/app/models/product.models';

@Injectable()
export class ProductEffects {
  error: any;
  constructor(
    private _action: Actions,
    private _product: ProductService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {
    this.error = this._product.getError();
  }

  getData = createEffect(
    () => {
      return this._action.pipe(
        ofType(getDataStart),
        mergeMap((action) => {
          return this._product.getData().pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return this.store.dispatch(
                getDataSuccess({ product: data.products })
              );
            }),
            catchError((err: any) => {
              let errorMessage!: string;
              this.error.forEach((errs: any) => {
                if (errs.status === err) {
                  errorMessage = errs.message;
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.store.dispatch(
                    setErrorMessage({ message: errorMessage })
                  );
                }
              });
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  getSingleData = createEffect(
    () => {
      return this._action.pipe(
        ofType(getSingleViewStart),
        mergeMap((action) => {
          // console.log(action.id);

          return this._product.getSingleProduct(action.id).pipe(
            map((data) => {
              // console.log(data);

              this.store.dispatch(setLoadingSpinner({ status: false }));
              return this.store.dispatch(
                getSingleViewSuccess({ product: data })
              );
              // console.log(data);
            }),
            catchError((err: any) => {
              let errorMessage!: string;
              this.error.forEach((errs: any) => {
                if (errs.status === err) {
                  errorMessage = errs.message;
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.store.dispatch(
                    setErrorMessage({ message: errorMessage })
                  );
                }
              });
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  addData = createEffect(
    () => {
      return this._action.pipe(
        ofType(addDataStart),
        exhaustMap((action) => {
          return this._product.postData(action.product).pipe(
            map((data) => {
              // console.log(data);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return this.store.dispatch(addDataSuccess({ product: data }));
            }),
            catchError((err: any) => {
              let errorMessage!: string;
              this.error.forEach((errs: any) => {
                if (errs.status === err) {
                  errorMessage = errs.message;
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.store.dispatch(
                    setErrorMessage({ message: errorMessage })
                  );
                }
              });
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  deleteData = createEffect(
    () => {
      return this._action.pipe(
        ofType(deleteDataStart),
        exhaustMap((action) => {
          return this._product.deleteProduct(action.id).pipe(
            map((data) => {
              console.log(data);

              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.toastr.success('Deleted Successfully');
              return this.store.dispatch(deleteDataSuccess({ id: data.id }));
            }),
            catchError((err: any) => {
              let errorMessage!: string;
              this.error.forEach((errs: any) => {
                if (errs.status === err) {
                  errorMessage = errs.message;
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.store.dispatch(
                    setErrorMessage({ message: errorMessage })
                  );
                }
              });
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  getDataFromCategory = createEffect(
    () => {
      return this._action.pipe(
        ofType(getDataFromCategoryStart),
        mergeMap((action) => {
          return this._product.getProduct(action.categor).pipe(
            map((data) => {
              console.log(data);

              this.store.dispatch(setLoadingSpinner({ status: false }));
              return this.store.dispatch(
                getDataFromCategorySuccess({ product: data.products })
              );
            }),
            catchError((err: any) => {
              let errorMessage!: string;
              this.error.forEach((errs: any) => {
                if (errs.status === err) {
                  errorMessage = errs.message;
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.store.dispatch(
                    setErrorMessage({ message: errorMessage })
                  );
                }
              });
              console.log(errorMessage);
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  searchProduct = createEffect(
    () => {
      return this._action.pipe(
        ofType(searchDataStart),
        switchMap((action) => {
          return this._product.search(action.searchText).pipe(
            map((data) => {
              console.log(data);

              return this.store.dispatch(
                serachDataSuccess({ product: data.products })
              );
            }),
            catchError((err: any) => {
              let errorMessage!: string;
              this.error.forEach((errs: any) => {
                if (errs.status === err) {
                  errorMessage = errs.message;
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.store.dispatch(
                    setErrorMessage({ message: errorMessage })
                  );
                }
              });
              console.log(errorMessage);
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  editProduct = createEffect(
    () => {
      return this._action.pipe(
        ofType(editDataStart),
        exhaustMap((action) => {
          return this._product.updateData(action.id, action.product).pipe(
            map((data) => {
              const update: Update<Product> = {
                id: action.id,
                changes: {
                  ...data,
                },
              };
              this.store.dispatch(editDataSuccess({ product: update }));
            }),
            catchError((err: any) => {
              let errorMessage!: string;
              this.error.forEach((errs: any) => {
                if (errs.status === err) {
                  errorMessage = errs.message;
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  this.store.dispatch(
                    setErrorMessage({ message: errorMessage })
                  );
                }
              });
              console.log(errorMessage);
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}

// actionName = categoryFetchStart;
// service = (action?: any) => {
//   this._product.getCategory();
// };

// fetchData(actionName: any, service: any, successAction:any, key:any) {
//   // console.log(actionName, service);

//   const data = createEffect(
//     () => {
//       return this._action.pipe(
//         ofType(actionName),
//         mergeMap((action) => {
//           return service().pipe(
//             map((data) => {
//               this.store.dispatch(setLoadingSpinner({ status: false }));
//               // console.log('hey');
//               console.log(data);
//               // this.store.dispatch(categoryFetchSuccess({[key]:String(data)}))
//             }),
//             catchError((err: any) => {
//               this.store.dispatch(setLoadingSpinner({ status: false }));
//               let errorMessage = err.error.message;
//               return of(setErrorMessage({ message: errorMessage }));
//             })
//           );
//         })
//       );
//     },
//     { dispatch: false }
//   );
//   return data;
// }
//
// getCat = this.fetchData(categoryFetchStart, this.service, categoryFetchSuccess, 'category');
