import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import LoginPage from '@src/pages/signin/form'

const schema = z.object({
  email: z.string().email('E-mail inválido.').max(255),
  password: z
    .string()
    .min(3, 'A senha deve conter pelo menos 8 caracteres.')
    .max(20, 'A senha deve ser menor que 20 caracteres.'),
})

export type FormSchema = z.infer<typeof schema>

export const Login = () => {
  const props = useForm<FormSchema>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <>
      <LoginPage {...props} />
    </>
  )
}

export default Login
