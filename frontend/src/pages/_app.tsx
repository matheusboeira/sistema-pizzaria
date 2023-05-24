import '@src/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from '@src/contexts/AuthContext'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer autoClose={3000} theme={'dark'} newestOnTop />
    </AuthProvider>
  )
}

export default App
