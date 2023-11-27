import React, { FC } from 'react';

import styles from './Button.module.scss';
import classNames from 'classnames';
import { Button as MuiButton, ButtonProps } from '@mui/base/Button';

interface IButtonProps extends ButtonProps {
  className?: string;
  children: React.ReactNode;
}

export const Button: FC<IButtonProps> = ({ className, children, ...props }) => {
  return (
    <MuiButton
      className={classNames(styles.button, className)}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
