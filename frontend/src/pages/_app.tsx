import '@src/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from '@src/contexts/AuthContext'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ThemeProvider attribute='class'>
				<Component {...pageProps} />
			</ThemeProvider>
			<ToastContainer autoClose={3000} theme={'dark'} newestOnTop />
		</AuthProvider>
	)
}

