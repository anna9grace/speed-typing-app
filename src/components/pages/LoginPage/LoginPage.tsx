import React, { FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './LoginPage.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { ILoginForm, loginSchema } from './LoginPage.forms';
import { Input } from '@mui/base/Input';

import { HelperMessage } from '../../ui/HelperMessage/HelperMessage';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../../constants';
import { Button } from '../../ui/Button/Button';
import { getErrorsMessage } from './LoginPage.helpers';
import { useSelector } from 'react-redux';
import { login } from '../../../store/api-actions';
import { store } from '../../../store';
import { getAuthStatus } from '../../../store/selectors';

export const LoginScreen: FC = () => {
  const navigate = useNavigate();
  const authStatus = useSelector(getAuthStatus);

  const formHandler = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = formHandler;

  useEffect(() => {
    if (authStatus === AuthorizationStatus.AUTH) {
      navigate(AppRoutes.ROOT);
    }
  }, [authStatus]);

  const handleOnSubmit = (evt: any) => {
    evt.preventDefault();
    handleSubmit(async (values: ILoginForm) => {
      await store.dispatch(login(values));
      navigate(AppRoutes.ROOT);
    })();
  };

  return (
    <form className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>Вход в аккаунт</h1>

        {!!Object.entries(errors).length && <HelperMessage>{getErrorsMessage(errors)}</HelperMessage>}
      </div>
      <ul className={styles.fields}>
        <li>
          <Controller
            name="email"
            control={control}
            render={({ field: { ref: _ref, name, ...rest }, fieldState: { error } }) => (
              <label htmlFor={`user-${name}`}>
                <Input
                  {...rest}
                  autoComplete="new-email"
                  id={`user-${name}`}
                  name={`user-${name}`}
                  placeholder="Email address"
                  error={!!error?.message}
                  type="email"
                  value={undefined}
                  className={styles.field}
                />
              </label>
            )}
          />
        </li>
        <li>
          <Controller
            name="password"
            control={control}
            render={({ field: { ref: _ref, name, value, ...rest }, fieldState: { error } }) => (
              <label htmlFor={`user-${name}`}>
                <Input
                  {...rest}
                  autoComplete="new-password"
                  id={`user-${name}`}
                  name={`user-${name}`}
                  placeholder="Password"
                  error={!!error?.message}
                  className={styles.field}
                  type="password"
                  value={undefined}
                />
              </label>
            )}
          />
        </li>

        <Button
          disabled={!isDirty}
          type="submit"
          onClick={handleOnSubmit}
        >
          Войти
        </Button>
      </ul>
    </form>
  );
};
