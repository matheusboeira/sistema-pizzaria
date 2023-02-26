import Link from 'next/link'
import Logo from '../Logo'
import styles from './Header.module.scss'

const Header = () => {
	return (
		<header className={styles.container}>
			<div className={styles.content}>
				<Link href={"/dashboard"}>
					<Logo />
				</Link>
			</div>
		</header>
	)
}

export default Header
