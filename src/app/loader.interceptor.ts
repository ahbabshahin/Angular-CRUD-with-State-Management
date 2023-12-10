import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,

} from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({
      reportProgress:true,
      // observe: 'event'
    })).pipe(
      map((event) => this.getEventMessage(event)
        ),
     );
}

private getEventMessage(event: HttpEvent<any>) {


  switch (event.type) {
    case HttpEventType.UploadProgress:
      console.log(event.type);
      console.log(this.fileUploadProgress(event));

      return this.fileUploadProgress(event);
      break;
    case HttpEventType.Response:
      console.log(event.type);
      return this.apiResponse(event);
      break;
    default:
      // return `File "${data.get('img').name}" surprising upload event: ${
      //   event.type
      // }.`;
      return 'hello'
      break
  }
}

private fileUploadProgress(event: any) {
  const percentDone = Math.round(100 * event.loaded / event.total);
  // console.log(event.loaded);
  // console.log(event.total);

  return { status: 'progress', message: percentDone };
}

private apiResponse(event: any) {
  return event.body;
};

}
