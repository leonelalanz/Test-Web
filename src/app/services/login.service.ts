import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public URL:string = "https://prueba-admision-web.herokuapp.com/";


  postLogin(user: User){
    return this.http.post(`${this.URL}session`, user);
  }

  getData(cid: string):Observable<User[]>{
    return this.http.get<User[]>(`${this.URL}data?cid=${cid}`);
  }

  constructor(private http: HttpClient) { }
}
