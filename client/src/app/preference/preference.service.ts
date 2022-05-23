import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IPreference } from '../models/preference.model';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  private $action: Subject<boolean> = new Subject<boolean>();
  private $setData: BehaviorSubject<IPreference[]> = new BehaviorSubject<
    IPreference[]
  >([]);
  private $startEdit: Subject<IPreference> = new Subject<IPreference>();
  constructor(private _http: HttpClient) {}

  getAll = (queryParams?: any): Observable<any> => {
    const defaultQueryParams = {
      page: 1,
      limit: 10,
    };
    const params = _.merge(defaultQueryParams, queryParams);
    return this._http.get<any>('preference', {
      params: params,
    });
  };

  create = (preference: IPreference): Observable<any> => {
    return this._http.post<any>('preference', preference);
  };

  updateOne = (preference: IPreference): Observable<any> => {
    return this._http.put<any>(`preference/${preference._id}`, preference);
  };

  deleteOne = (preference: IPreference): Observable<any> => {
    return this._http.delete<any>(`preference/${preference._id}`);
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

  startEdit = (preference: IPreference) => {
    this.$startEdit.next(preference);
  };

  isEdit = () => {
    return this.$startEdit.asObservable();
  };
}
