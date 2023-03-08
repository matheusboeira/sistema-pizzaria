import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'
import { TOKEN_NAME } from '@src/contexts/AuthContext';

export function GuestGuard<P extends { [key: string]: any }>(
	fn: GetServerSideProps<P>
) {
	return async (
		context: GetServerSidePropsContext
	): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(context)

		if (cookies[TOKEN_NAME]) {
			return {
				redirect: {
					destination: '/dashboard',
					permanent: false
				}
			}
		}

		return await fn(context)
	}
}
