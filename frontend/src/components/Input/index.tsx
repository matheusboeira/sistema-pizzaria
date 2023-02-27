import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Input = ({ className, ...rest }: InputProps) => {
	return <input className={[styles.input, className].join(' ')} {...rest} />
}

export const TextArea = ({ className, ...rest }: TextAreaProps) => {
	return (
		<textarea
			className={[styles.input, className].join(' ')}
			{...rest}
		></textarea>
	)
}
