import Link from 'next/link'
import Logo from '../Logo'
import styles from './Header.module.scss'

import { FiLogOut } from 'react-icons/fi'
import { signOut } from '@src/contexts/AuthContext';

const Header = () => {
	return (
		<header className={styles.container}>
			<div className={styles.content}>
				<Link href={'/dashboard'}>
					<Logo width={160} />
				</Link>
				<nav className={styles.nav}>
					<Link href='/category'>Categoria</Link>
					<Link href='/product'>Cardápio</Link>
					<button onClick={signOut}>
						<FiLogOut color='#fff' size={24} />
					</button>
				</nav>
			</div>
		</header>
	)
}

export default Header
