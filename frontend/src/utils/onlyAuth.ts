import { TOKEN_NAME } from '@src/contexts/AuthContext'
import { AuthTokenError } from '@src/services/errors/AuthTokenError'
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult
} from 'next'
import { parseCookies, destroyCookie } from 'nookies'

export function onlyAuth<P extends { [key: string]: any }>(
	fn: GetServerSideProps<P>
) {
	return async (
		context: GetServerSidePropsContext
	): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(context)
		const token = cookies[TOKEN_NAME]

		if (!token) {
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}

		try {
			return await fn(context)
		} catch (err) {
			if (err instanceof AuthTokenError) {
				destroyCookie(context, TOKEN_NAME)
				return {
					redirect: {
						destination: '/',
						permanent: false
					}
				}
			}
		}

		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}
