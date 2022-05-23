import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private _http: HttpClient) {}

  uploadFile(file: any): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);

    return this._http.post('file/upload', formData);
  }
}
