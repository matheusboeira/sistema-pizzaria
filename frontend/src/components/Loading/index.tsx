import styles from './Loading.module.scss'

import { CgSpinnerTwo } from 'react-icons/cg'
import { FaSpinner } from 'react-icons/fa'
import { IconBaseProps } from 'react-icons/lib'

export const PrimarySpinner = (props: IconBaseProps) => (
	<FaSpinner
		className={styles.loading}
		color={props.color ?? '#fff'}
		size={props.size ?? 16}
	/>
)

export const SecondarySpinner = (props: IconBaseProps) => (
	<CgSpinnerTwo
		className={styles.loading}
		color={props.color ?? '#fff'}
		size={props.size ?? 16}
	/>
)
