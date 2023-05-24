import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  register?: UseFormRegister<FieldValues>
}

export const Input = React.forwardRef<
  InputProps,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref: React.ForwardedRef<any>) => {
  return (
    <input
      ref={ref}
      className={[styles.input, className].join(' ')}
      {...props}
    />
  )
})
