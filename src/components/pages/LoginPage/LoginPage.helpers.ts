import { FieldErrors } from 'react-hook-form';
import { ILoginForm } from './LoginPage.forms';

export const getErrorsMessage = (errors: FieldErrors<ILoginForm>) =>
  Object.values(errors)
    .map(error => error.message)
    .join('. ');
