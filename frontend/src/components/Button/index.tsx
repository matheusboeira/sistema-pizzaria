import { ButtonHTMLAttributes } from 'react'
import { PrimarySpinner } from '../Loading'
import { StyledButton } from './Button.styled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'tertiary'
	loading?: boolean
	icon?: JSX.Element
	children?: React.ReactNode
	customize?: string
}

export const Button = ({
	variant = 'primary',
	children,
	...rest
}: ButtonProps) => {
	return (
		<StyledButton variant={variant} {...rest}>
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
