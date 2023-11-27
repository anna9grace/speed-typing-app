import { ILoginForm } from './LoginPage.forms';

export interface IFieldError {
  field: keyof ILoginForm;
  message: string;
}
