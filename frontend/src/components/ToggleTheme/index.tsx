import styles from './ToggleTheme.module.scss'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import {
	ToggleCircle,
	ToggleInput,
	ToggleLabel,
	ToggleSpan
} from './ToggleTheme.styled'

const ToggleTheme = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const toggleTheme = () => {
		return theme === 'dark' ? 'light' : 'dark'
	}

	const handleClick = () => {
		setTheme(toggleTheme())
	}

	return (
		<>
			<ToggleLabel>
				<ToggleInput id={styles.input} type='checkbox' onClick={handleClick} />
				<ToggleSpan position={theme === 'dark' ? 'left' : 'right'}>
					{theme === 'dark' ? (
						<FaSun color='#f29a12' />
					) : (
						<FaMoon color='#efc60b' />
					)}
				</ToggleSpan>
				<ToggleCircle />
			</ToggleLabel>
		</>
	)
}

export default ToggleTheme
