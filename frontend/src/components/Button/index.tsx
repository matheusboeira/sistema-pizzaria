import { ComponentProps } from 'react'
import { PrimarySpinner } from '../Loading'
import { StyledButton } from './Button.styled'

type SubsetButtonProps = Pick<
  ComponentProps<'button'>,
  'type' | 'disabled' | 'onClick'
>

interface ButtonProps extends SubsetButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  loading?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
  customize?: string
}

export const Button = ({
  variant = 'primary',
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton disabled={disabled} variant={variant} {...rest}>
      {children}
    </StyledButton>
  )
}

export const LoadingButton = ({
  icon = <PrimarySpinner />,
  loading,
  children,
  ...rest
}: ButtonProps) => {
  return <Button {...rest}>{loading ? icon : children}</Button>
}
