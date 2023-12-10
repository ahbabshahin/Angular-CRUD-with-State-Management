import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProgressService } from './progress.service';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private _http: HttpClient,private _progress: ProgressService) {}

 httpOptions: HttpHeaders = new HttpHeaders({
    'enctype': 'multipart/form-data',
  });

  // ,{
  //
  // }

  upload(data: FormData): Observable<any> {
    console.log(data);

    return this._http
      .post('https://api.escuelajs.co/api/v1/files/upload',data,{
        headers:{skip:"true"},
        reportProgress: true,
        observe: 'events',
    } )
      .pipe(map((event) => this._progress.getEventMessage(event)));
  }
}
