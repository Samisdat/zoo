import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import {default as MuiButton} from '@mui/material/Button';

type ButtonVariant = 'contained' | 'outlined'
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: ButtonVariant,
    size?: ButtonSize,
    children: ReactNode,
};

export const buttonDefaultProps: Partial<ButtonProps> = {
    variant: 'contained',
    size: 'medium',
};

const Button:FC<ButtonProps> = (props) => {

    return (
        <MuiButton
            variant={props.variant}
            size={props.size}
        >{props.children}</MuiButton>
    )

    return (null);
};

Button.defaultProps = buttonDefaultProps;

export default Button;
