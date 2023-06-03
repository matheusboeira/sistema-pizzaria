import { ComponentProps } from 'react'
import { PrimarySpinner } from '../Loading'
import { StyledButton } from './Button.styled'

interface ButtonProps extends Pick<ComponentProps<'button'>, 'disabled'> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  loading?: boolean
  icon?: JSX.Element
  children?: React.ReactNode
  customize?: string
}

export const Button = ({ variant = 'primary', children, disabled, ...rest }: ButtonProps) => {
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
