import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUser } from '../models/user.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private $setData: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  private $action: Subject<boolean> = new Subject<boolean>();
  constructor(private _http: HttpClient) {}

  getUsers = (queryParams?: any): Observable<any> => {
    const defaultQueryParams = {
      page: 1,
      limit: 10,
    };
    const params = _.merge(defaultQueryParams, queryParams);
    return this._http.get<any>('user', {
      params: params,
    });
  };

  getOne = (userId: string): Observable<any> => {
    return this._http.get(`user/${userId}`);
  };

  create = (user: IUser): Observable<any> => {
    let formData = this.setFormData(user, false);
    return this._http.post<any>('user', formData);
  };

  setFormData = (user: IUser, setId: boolean = false) => {
    const formData = new FormData();
    if (setId) formData.append('_id', user._id!);
    formData.append('name', user.name);
    formData.append('photo', user.photo);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('preference', JSON.stringify(user.preference));
    return formData;
  };

  updateOne = (user: IUser): Observable<any> => {
    let formData = this.setFormData(user, true);
    return this._http.put<any>(`user/${user._id}`, formData);
  };

  deleteOne = (user: IUser): Observable<any> => {
    return this._http.delete<any>(`user/${user._id}`);
  };

  actionPerformed = () => {
    this.$action.next(true);
  };

  isActionPerformed = () => {
    return this.$action.asObservable();
  };

  dataChanged = (data: any) => {
    this.$setData.next(data);
  };

  isDataChange = () => {
    return this.$setData.asObservable();
  };
}
