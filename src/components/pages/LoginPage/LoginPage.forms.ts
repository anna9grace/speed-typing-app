import * as yup from 'yup';

export interface ILoginForm {
  email: string;
  password: string;
}

const isEmptyString = /\S/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Пожалуйста, укажите почту')
    .matches(isEmptyString, 'Пожалуйста, укажите почту')
    .email('Пожалуйста, введите корректный адрес почты'),
  password: yup
    .string()
    .required('Пароль не может быть пустым')
    .matches(isEmptyString, 'Пароль не может быть пустым')
    .min(6, 'Пароль не может быть короче 6 символов'),
});
