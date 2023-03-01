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

	const handleClick = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<>
			<ToggleLabel>
				<ToggleInput onClick={handleClick} id={styles.input} type='checkbox' />
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
