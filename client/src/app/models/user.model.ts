import { IPreference } from './preference.model';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo: any;
  preference: IPreference[];
}
