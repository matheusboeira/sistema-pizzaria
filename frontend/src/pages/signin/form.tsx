import Logo from '@src/components/Logo'
import Page from '@src/components/Page'
import ToggleTheme from '@src/components/ToggleTheme'
import { UseFormReturn } from 'react-hook-form'

import { LoadingButton } from '@src/components/Button'
import { Input } from '@src/components/Input'
import { AuthContext } from '@src/contexts/AuthContext'
import styles from '@src/styles/Home.module.scss'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { FormSchema } from '@src/pages/index'

const LoginPage = (props: UseFormReturn<FormSchema>) => {
  const { signIn } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState,
    handleSubmit,
    formState: { errors }
  } = props

  const onSubmit = async (data: FormSchema) => {
    setLoading(true)
    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Page title="Faça seu login">
        <div className={styles.toggleTheme}>
          <ToggleTheme />
        </div>
        <div className={styles.container}>
          <Logo />
          <div className={styles.login}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register('email')}
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
              {formState.errors.email && (
                <span className="text-sm text-red-700">
                  {formState.errors.email.message as string}
                </span>
              )}
              <br />
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="text-sm text-red-700">
                  {errors.password.message}
                </span>
              )}
              <br />
              <LoadingButton disabled={loading} loading={loading} type="submit">
                Acessar
              </LoadingButton>
            </form>
            <Link href="/signup" className={styles.text}>
              Não possui uma conta? <span>Cadastre-se</span>
            </Link>
          </div>
        </div>
      </Page>
    </>
  )
}

export default LoginPage
