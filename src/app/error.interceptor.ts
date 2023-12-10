import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            this.toastr.error('Error Event');
          }
        } else {
          this.toastr.error('An error occured');
        }
        // return throwError(() => new Error(error.statusText));
         throw(error.status);
      })
    );
  }
}
// else {
//   switch (error.status) {
//     case 0:
//       throw(error);
//       // break;
//     case 400:
//       throw(error);
//       // break;
//     case 401:
//       throw(error);
//       break;
//     case 403:
//       throw(error);
//       break;
//     case 404:
//       throw(error);
//       break;
//     case 500:
//       throw(error);
//       break;
//     case 503:
//       throw(error);
//       break;

//     default:
//       console.log('Unknown error');
//       break;
//   }
// }
