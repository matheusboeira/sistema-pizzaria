import { ButtonHTMLAttributes } from 'react'
import { PrimarySpinner } from '../Loading'
import { StyledButton } from './Button.styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'primary' | 'secondary' | 'tertiary'
	loading?: boolean
	icon?: JSX.Element
	children?: React.ReactNode
	customize?: string
}

export const Button = ({ loading, icon, children, ...rest }: ButtonProps) => {
	return (
		<StyledButton disabled={loading} {...rest}>
			{loading ? icon : <a>{children}</a>}
		</StyledButton>
	)
}

Button.defaultProps = {
	variant: 'primary',
	icon: <PrimarySpinner />
}
