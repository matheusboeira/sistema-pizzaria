import '@src/styles/globals.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from '@src/contexts/AuthContext'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
			<ToastContainer autoClose={3000} theme={'dark'} newestOnTop />
		</AuthProvider>
	)
}

