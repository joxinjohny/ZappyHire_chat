import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  httpHeader: { headers: HttpHeaders; };

  constructor(private http:HttpClient) {
    this.httpHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  }

  private getBaseApi() {
    return environment.API_BASE;
  }

  private getFullApi(path:string) {
    return this.getBaseApi() + path;
  }

  post(path:string, requestBody:any):Observable<any> {
    return this.http.post(this.getFullApi(path), requestBody, this.httpHeader);
  }
}
