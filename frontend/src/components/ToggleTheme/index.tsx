import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ToggleTheme = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		mounted && (
			<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
				{theme === 'dark' ? 'light' : 'dark'}
			</button>
		)
	)
}

export default ToggleTheme
