import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }
  public getEventMessage(event: HttpEvent<any>) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);

      default:
        return `File "" surprising upload event: ${
          event.type
        }`;
    }
  }
  private fileUploadProgress(event: any) {
    const percentDone = Math.round((100 * event.loaded) / event.total);
    // console.log(percentDone);

    return { status: 'progress', message: percentDone };
  }
  private apiResponse(event: any) {
    return event.body;
  }
}
